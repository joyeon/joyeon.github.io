/**
 * 봄동 캠프 신청 폼 → Google Sheet
 *
 * joyeon.co/spring-camp/YYYY-MM/ 신청 폼(_layouts/camp-apply.html)과
 * 익명 피드백 폼(_layouts/camp-feedback.html)이 이 웹 앱으로 POST한다.
 * 모임마다 camp_id 이름의 탭이 생기고, 신청 한 건이 한 줄로 쌓인다.
 * 새 질문이 생기면 맨 오른쪽에 열이 추가된다. 새 신청이 오면 시트 주인에게 알림 메일을 보낸다.
 * (_scripts/는 밑줄로 시작해서 Jekyll 빌드에 포함되지 않는다.)
 *
 * 설치 (최초 1회)
 *  1. Google Sheet를 새로 만든다 (예: "봄동 캠프 신청").
 *  2. 시트 메뉴 확장 프로그램 > Apps Script를 열고, 기본 코드를 지운 뒤 이 파일 내용을 붙여 넣고 저장한다.
 *  3. 배포 > 새 배포 > 유형 "웹 앱"
 *       - 다음 사용자 인증 정보로 실행: 나
 *       - 액세스 권한이 있는 사용자: 모든 사용자
 *     권한 승인 창이 뜨면 본인 계정으로 허용한다 ("안전하지 않음" 경고는 고급 > 이동).
 *  4. 웹 앱 URL(https://script.google.com/macros/s/.../exec)을 복사해
 *     _config.yml의 camp_form_endpoint에 넣는다. 브라우저로 열어 "ok"가 보이면 정상이다.
 *
 * 코드를 고친 뒤에는 배포 > 배포 관리 > 수정(연필) > 버전 "새 버전"으로 다시 배포해야 반영된다.
 * 이 방법이면 URL이 바뀌지 않는다. "새 배포"를 하면 URL이 바뀌므로 _config.yml도 고쳐야 한다.
 */

var MAX_FIELDS = 40;
var MAX_LABEL = 200;
var MAX_VALUE = 5000;

function doGet() {
  return ContentService.createTextOutput('ok');
}

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.parameter.payload);
  } catch (err) {
    return reply_({ ok: false, error: 'bad payload' });
  }

  // 스팸 봇이 채우는 숨은 칸. 봇에게는 성공으로 응답하고 저장하지 않는다.
  if (data.website) return reply_({ ok: true });

  var camp = String(data.camp || '').trim();
  if (!/^[0-9A-Za-z_-]{1,40}$/.test(camp)) return reply_({ ok: false, error: 'bad camp' });

  var fields = data.fields;
  if (!Array.isArray(fields) || fields.length === 0 || fields.length > MAX_FIELDS) {
    return reply_({ ok: false, error: 'bad fields' });
  }
  for (var i = 0; i < fields.length; i++) {
    var f = fields[i];
    if (!Array.isArray(f) || f.length !== 2) return reply_({ ok: false, error: 'bad fields' });
    f[0] = String(f[0]).trim().slice(0, MAX_LABEL);
    f[1] = String(f[1]).trim().slice(0, MAX_VALUE);
    if (!f[0]) return reply_({ ok: false, error: 'bad fields' });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    appendRow_(camp, fields);
  } finally {
    lock.releaseLock();
  }

  // 알림 메일이 실패해도 신청은 이미 저장됐으므로 성공으로 응답한다.
  try {
    notify_(camp, data, fields);
  } catch (err) {
    console.error(err);
  }

  return reply_({ ok: true });
}

function appendRow_(camp, fields) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(camp) || ss.insertSheet(camp);
  var lastCol = sheet.getLastColumn();
  var header = lastCol ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : ['제출 시각'];

  var row = [new Date()];
  fields.forEach(function (f) {
    var col = header.indexOf(f[0]);
    if (col < 0) {
      header.push(f[0]);
      col = header.length - 1;
    }
    row[col] = safe_(f[1]);
  });
  for (var i = 0; i < header.length; i++) {
    if (row[i] === undefined) row[i] = '';
  }

  sheet.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.appendRow(row);
}

// =, +, -, @로 시작하는 답변이 수식으로 해석되지 않게 한다. 앞의 '는 시트에 보이지 않는다.
function safe_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function notify_(camp, data, fields) {
  var name = String(data.name || '').trim();
  var email = String(data.email || '').trim();
  var body = fields.map(function (f) {
    return f[0] + '\n' + (f[1] || '-');
  }).join('\n\n');
  body += '\n\n' + SpreadsheetApp.getActiveSpreadsheet().getUrl();

  var message = {
    to: Session.getEffectiveUser().getEmail(),
    // 이름이 없으면 익명 피드백이다
    subject: '[봄동 ' + camp + '] ' + (name ? '새 신청: ' + name : '새 응답'),
    body: body
  };
  // 알림 메일에서 바로 답장하면 신청자에게 가도록
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) message.replyTo = email;
  MailApp.sendEmail(message);
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

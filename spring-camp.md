---
layout: page
title: 봄동
permalink: /spring-camp/
redirect_from: /spring-club/
summary: "숲이 보이는 작업실, 네 명의 모닥불."
og_image: /assets/images/spring-club/camp-chairs.jpg
og_url: /spring-camp/
show_firewood: false  # 장작 섹션: 첫 모임 이후 true로 바꾸면 다시 보인다
---

<style>
/* 봄동 랜딩 페이지 전용. 모든 클래스는 sc- 접두사로 이 페이지에만 적용된다. */

.sc-subtitle {
  margin: 0 0 2rem;
  font-size: 1.25rem;
  line-height: 1.6;
  font-weight: 400;
  color: #535353;
  word-break: keep-all;
}

/* 창: 사진 사이 5px 간격이 창살. 모바일은 위 1장 + 아래 2x2, 데스크톱은 위 1장 + 아래 4장 한 줄 */
.sc-window { margin: 0 0 3rem; }
.sc-window-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
}
.sc-pane {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;
}
.sc-pane-wide {
  grid-column: 1 / -1;
  aspect-ratio: 3 / 2;
}
.sc-pane img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sc-pane-greenhouse img { object-position: bottom; }
.sc-window figcaption {
  margin-top: .5rem;
  font-size: .9rem;
  line-height: 1.4;
  color: #7a7a7a;
  text-align: left;
  word-break: keep-all;
}

/* 본문: 한글이 단어 중간에서 끊기지 않게 */
.sc-intro,
.sc-section { word-break: keep-all; }
.sc-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: thin solid #eaeaea;
}
.sc-section h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
}
/* 캠프 수칙: 왼쪽 2.5rem 열에 CSS로 만든 번호(01~07), 오른쪽에 문장. 첫 문장 뒤는 .note로 옅게 */
.sc-rules {
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
  counter-reset: sc-rule;
}
.sc-rules li {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  line-height: 1.7;
  counter-increment: sc-rule;
}
.sc-rules li + li { margin-top: .9em; }
.sc-rules li::before {
  content: counter(sc-rule, decimal-leading-zero);
  align-self: start;
  font-size: .8em;
  line-height: 2.125; /* 1.7 / 0.8: 첫 줄과 같은 높이로 맞춘다 */
  color: #7a7a7a;
  font-variant-numeric: tabular-nums;
}
.sc-rules .note { color: #767676; }
.sc-muted { color: #7a7a7a; }
.sc-log { list-style: none; margin: 0; padding-left: 0; }
.sc-log li { padding: .5rem 0; border-bottom: thin solid #f3f3f3; }
.sc-log li:last-child { border-bottom: none; }
.sc-log time,
.sc-log-next { color: #7a7a7a; }

@media screen and (min-width: 48em) {
  .sc-subtitle { font-size: 1.5rem; }
  .sc-window-grid { grid-template-columns: repeat(4, 1fr); }
  .sc-section { margin-top: 4rem; padding-top: 2.5rem; }
  .sc-section h2 { font-size: 1.5rem; line-height: 2rem; }
  .sc-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
  }
}
</style>

<p class="sc-subtitle">숲이 보이는 작업실, 네 명의 모닥불.</p>

<figure class="sc-window">
  <div class="sc-window-grid">
    <div class="sc-pane sc-pane-wide">
      <img src="{{ site.url }}/assets/images/spring-club/camp-chairs.jpg"
           srcset="{{ site.url }}/assets/images/spring-club/camp-chairs-800.jpg 800w, {{ site.url }}/assets/images/spring-club/camp-chairs.jpg 1440w"
           sizes="(min-width: 48em) 48rem, calc(100vw - 3rem)"
           width="1440" height="1080" alt="통창 앞 초록 러그 위, 낮은 캠핑 테이블을 둘러싼 캠핑 의자 네 개와 창밖의 가을 나무">
    </div>
    <div class="sc-pane sc-pane-greenhouse">
      <img src="{{ site.url }}/assets/images/spring-club/window-greenhouse-800.jpg"
           srcset="{{ site.url }}/assets/images/spring-club/window-greenhouse-800.jpg 632w, {{ site.url }}/assets/images/spring-club/window-greenhouse.jpg 1263w"
           sizes="(min-width: 48em) 12rem, calc(50vw - 2rem)"
           width="1263" height="1600" alt="작업실 창 너머로 올려다본 여름 나무들과 그 아래 온실 지붕">
    </div>
    <div class="sc-pane">
      <img src="{{ site.url }}/assets/images/spring-club/desk-reflection-800.jpg"
           srcset="{{ site.url }}/assets/images/spring-club/desk-reflection-800.jpg 640w, {{ site.url }}/assets/images/spring-club/desk-reflection.jpg 976w"
           sizes="(min-width: 48em) 12rem, calc(50vw - 2rem)"
           width="976" height="1220" alt="스탠드가 놓인 유리 책상에 비친 창밖의 가을 나무와 온실">
    </div>
    <div class="sc-pane">
      <img src="{{ site.url }}/assets/images/spring-club/squirrel-800.jpg"
           srcset="{{ site.url }}/assets/images/spring-club/squirrel-800.jpg 600w, {{ site.url }}/assets/images/spring-club/squirrel.jpg 1200w"
           sizes="(min-width: 48em) 12rem, calc(50vw - 2rem)"
           width="1200" height="1600" alt="창밖 나뭇가지 위의 청설모">
    </div>
    <div class="sc-pane">
      <img src="{{ site.url }}/assets/images/spring-club/greenhouse-dusk-800.jpg"
           srcset="{{ site.url }}/assets/images/spring-club/greenhouse-dusk-800.jpg 600w, {{ site.url }}/assets/images/spring-club/greenhouse-dusk.jpg 1200w"
           sizes="(min-width: 48em) 12rem, calc(50vw - 2rem)"
           width="1200" height="1600" alt="해 질 녘 창틀 너머로 불이 켜진 온실">
    </div>
  </div>
  {% comment %}TODO: 캡션 문구 확정 전{% endcomment %}
  <figcaption>작업실에서 본 창밖, 여름부터 가을까지.</figcaption>
</figure>

<div class="sc-intro">
  <p>올 봄에 새 작업실을 얻었습니다. 책상 두개를 놓고 약간의 여유가 있는 이 공간은 식물로 가득한 온실을 커다란 통창으로 마주하는 곳입니다. 저와 이 공간을 공유하고 있는 E님이 무엇이든 시작하는 봄의 느낌을 담아 <strong>봄동</strong>이라는 이름을 붙여주었어요. <strong>봄 동아리</strong>, 영어로는 <strong>Spring Club</strong>입니다.</p>
  <p>작은 공간이지만 통창 너머가 온실이라 도심 한가운데서도 숲에 들어와 있는 기분이 들어요. 혼자 누리기는 아까운 이 공간을 어떻게 나눌까 고민하다 제가 좋아하는 캠핑을 떠올렸습니다.</p>
  <p>작은 화롯대를 가운데 두고 둘러앉아 나지막이 나눈 대화는 일상으로 돌아온 뒤에도 한 번씩 떠오릅니다. 그런 시간과 공간을 여기서 만들 수 있으면 좋을 것 같아요.</p>
</div>

<section class="sc-section">
  <h2>왜 작은 모임인가</h2>
  <p>그동안 독서 모임의 클럽장을 맡기도 했고, 커피챗으로 정말 많은 분을 만났습니다. 고민을 듣고 경험을 나누고 돌아오는 길은 늘 좋았어요. 그런데 아쉬움도 늘 같았습니다. 대화가 좋았는데도 다음으로 이어지지 않았고, 사람이 많으면 깊은 얘기까지 가지 못했고, 읽어 와야 할 책이 있으면 가기 전부터 숙제 같았고, 멤버와 날짜가 정해진 모임은 한두 명이 빠지기 시작하면 흐지부지됐습니다.</p>
  <p>요즘은 일의 많은 부분을 AI와 함께 합니다. 혼자서도 꽤 많은 일이 되는 시대라, 거꾸로 사람과 마주 앉는 시간이 더 귀해졌습니다. 늘 조직 안에서 일해 온 저는 요즘 그걸 누구보다 크게 느낍니다. 그래서 작게, 가볍게, 오래 가는 모임을 만들어 보기로 했습니다.</p>
  <p>네 명이면 모두가 말할 수 있고, 준비물이 없으면 오기 쉽고, 매번 새로 모이면 빠져도 미안하지 않겠지요.</p>
</section>

<section class="sc-section">
  <h2>봄동 캠프</h2>
  <p>한 달에 한 번쯤, 네 명이 모여 한 가지 주제로 이야기합니다. 읽어올 책도, 준비할 발표도 없습니다. 한번이라도 다녀가신 분은 메일링 리스트에 모시고, 다음 주제가 정해지면 메일로 알려드립니다. 오고 싶은 날에만 오시면 됩니다.</p>
</section>

<section class="sc-section">
  <h2>캠프 수칙</h2>
  <ol class="sc-rules" role="list">
    <li><span>모닥불 하나, 네 자리.</span></li>
    <li><span>초대로만 옵니다. <span class="note">자리가 남으면 한 분까지 데려올 수 있습니다.</span></span></li>
    <li><span>준비물은 없습니다. <span class="note">가벼운 간식과 커피를 위한 소액의 참가비가 있습니다.</span></span></li>
    <li><span>불은 주제를 낸 사람이 피웁니다.</span></li>
    <li><span>모임 소식은 메일로만. <span class="note">단톡방은 없습니다.</span></span></li>
    <li><span>모임이 끝나면 다음 장작 하나를 남깁니다.</span></li>
    <li><span>호스트 포함 세 명이면 엽니다.</span></li>
  </ol>
</section>

{% if page.show_firewood %}
<section class="sc-section">
  <h2>장작</h2>
  {% comment %}TODO: 장작 기록을 공개 페이지에 쌓을지 결정{% endcomment %}
  <p class="sc-muted">첫 번째 장작은 2026년 11월에 피웁니다.</p>
  {% comment %}
  모임 기록이 생기면 아래 목록을 주석 밖으로 꺼내 쓴다. 최근 모임을 위에 둔다. 참여자 이름은 넣지 않는다.
  <ul class="sc-log">
    <li><time datetime="2026-11-00">2026.11.00</time> — <span class="sc-log-topic">주제</span> — <span class="sc-log-next">남긴 장작</span></li>
  </ul>
  {% endcomment %}
</section>
{% endif %}

<div class="sc-pair">
  <section class="sc-section">
    <h2>캠프 위치</h2>
    <p>건대입구역 근처입니다. 주소는 초대 메일에 담아 보내드립니다.</p>
  </section>
  <section class="sc-section">
    <h2>입구</h2>
    <p>봄동은 다녀간 분이 한 분을 데려오는 방식으로 넓어집니다. 그게 입구입니다.</p>
  </section>
</div>

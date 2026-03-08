let timer = null;

function startAutoSave() {
  // 기존 타이머가 있다면 제거
  if (timer) clearInterval(timer);

  chrome.storage.local.get(['enabled', 'interval'], (result) => {
    const isEnabled = result.enabled ?? false;
    const minutes = result.interval ?? 5;
    const ms = minutes * 60 * 1000;

    if (isEnabled) {
      console.log(`엔트리 자동 저장 활성: ${minutes}분마다 실행`);
      timer = setInterval(() => {
        const saveButton = document.querySelector('.entryPlay__save_button') || 
                           document.querySelector('[title="저장하기"]');
        if (saveButton) {
          saveButton.click();
          console.log("자동 저장되었습니다: " + new Date().toLocaleTimeString());
        }
      }, ms);
    } else {
      console.log("엔트리 자동 저장 비활성 상태");
    }
  });
}

// 확장프로그램 설정이 변경될 때마다 다시 시작 (저장 버튼 누르면 바로 적용되게)
chrome.storage.onChanged.addListener(() => {
  startAutoSave();
});

// 페이지 로드 시 최초 실행
startAutoSave();

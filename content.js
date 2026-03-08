const SAVE_INTERVAL = 5 * 60 * 1000; // 5분

function tryAutoSave() {
  chrome.storage.local.get(['enabled'], (result) => {
    if (result.enabled) {
      // 엔트리의 '저장하기' 버튼 (클래스명은 사이트 상황에 따라 확인 필요)
      const saveButton = document.querySelector('.entryPlay__save_button') || 
                         document.querySelector('[title="저장하기"]');
      
      if (saveButton) {
        saveButton.click();
        console.log("엔트리 자동 저장 완료: " + new Date().toLocaleTimeString());
      }
    }
  });
}

// 5분마다 체크
setInterval(tryAutoSave, SAVE_INTERVAL);

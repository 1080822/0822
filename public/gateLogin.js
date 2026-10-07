(() => {
  const GATE_KEY = 'board_gate_ok_v1';

  const input = document.getElementById('password');
  const btn = document.getElementById('submit');
  const errorEl = document.getElementById('error');

  async function submit() {
    const password = input.value;
    errorEl.textContent = '';
    if (!password) return;

    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = '確認中...';

    const { data, error } = await window.sb.rpc('check_site_password', { p_password: password });

    btn.disabled = false;
    btn.textContent = originalText;

    if (error) {
      errorEl.textContent =
        error.message === 'rate_limited'
          ? '少し間隔をあけてからもう一度お試しください。'
          : '通信エラーが発生しました。もう一度お試しください。';
      return;
    }

    if (data === true) {
      sessionStorage.setItem(GATE_KEY, '1');
      location.href = 'index.html';
    } else {
      errorEl.textContent = 'パスワードが違います。';
      input.value = '';
      input.focus();
    }
  }

  btn.addEventListener('click', submit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submit();
  });
})();

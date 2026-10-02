// 상담 문의와 입사 문의의 구글폼 주소입니다.
const FORM_LINKS = {
  consultation: 'https://docs.google.com/forms/d/e/1FAIpQLSfqx7ye2pTeqVRZRyxEFEuooP_Ed_gsUBQGYxEUtPBKhY4_jQ/viewform',
  recruitment: 'https://docs.google.com/forms/d/e/1FAIpQLSfAySxHAbMIoca3_DlbjCMTnlzmLICsRJBB2GIjM0ioWdZlfg/viewform'
};

document.querySelectorAll('[data-inquiry]').forEach(link => {
  const url = FORM_LINKS[link.dataset.inquiry];
  let valid = false;
  try {
    const parsed = new URL(url);
    valid = parsed.protocol === 'https:' &&
      (parsed.hostname === 'forms.gle' ||
       (parsed.hostname === 'docs.google.com' && parsed.pathname.startsWith('/forms/')));
  } catch (_) {}
  if (valid) {
    link.href = url;
    link.removeAttribute('aria-disabled');
  } else {
    link.addEventListener('click', event => {
      event.preventDefault();
      document.getElementById('inquiryStatus').textContent = '문의 접수 준비 중입니다. 잠시 후 다시 이용해 주세요.';
      document.getElementById('apply').scrollIntoView({ block: 'center' });
    });
  }
});

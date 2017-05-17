import sendAjaxJson from './sendAjax';

export default function prepareSend(url, form, data, cb) {
  let resultContainer = form.querySelector('.status');
  resultContainer.innerHTML = 'Sending...';
  sendAjaxJson(url, data, function (data) {
    form.reset();
    resultContainer.innerHTML = data;
    if (cb) {
      cb(data);
    }
  });
}
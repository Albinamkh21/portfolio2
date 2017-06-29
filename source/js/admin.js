import fileUpload from './admin/upload';
import prepareSend from './prepareSend';

const formWork = document.querySelector('#work');
const formBlog = document.querySelector('#blog');

var editor = new nicEditor({fullPanel : true}).panelInstance('blogArlicle');

if(formWork)
    formWork.addEventListener('submit', prepareSendWorkData);
if(formBlog)
    formBlog.addEventListener('submit', prepareSendPost);

function prepareSendWorkData(e) {
  e.preventDefault();
  let resultContainer = formWork.querySelector('.status');
  let formData = new FormData();
  let file = document.querySelector('#work-img').files[0];
  let name = document.querySelector('#work-name').value;
  let technology = document.querySelector('#work-technology').value;

  formData.append('img', file, file.name);
  formData.append('name', name);
  formData.append('technology', technology);

  resultContainer.innerHTML = 'Uploading...';
  fileUpload('/admin/addwork', formData, function (data) {
    resultContainer.innerHTML = data;
      formWork.reset();
  });
}

function prepareSendPost(e) {
    e.preventDefault();

    var text  = nicEditors.findEditor('blogArlicle').getContent();
    let data = {
        title: formBlog.title.value,
        date: formBlog.date.value,
        text: text
    };
    console.log(text);
    prepareSend('/admin/addpost', formBlog, data);
}
//var blogArlicle =  document.querySelector('#blogArlicle');

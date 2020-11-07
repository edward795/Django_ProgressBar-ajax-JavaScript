console.log("HEllo World!")
const uploadform=document.getElementById('upload_form');
const input=document.getElementById('id_image')
console.log(input);

const alertBox=document.getElementById('alert-box');
const imageBox=document.getElementById('image-box');
const progressBox=document.getElementById('progress-box');
const cancelBox=document.getElementById('cancel-box');
const cancelBtn=document.getElementById('cancel-btn');
const uploadBtn=document.getElementById('upload-btn');
const uploadBox=document.getElementById('upload-box');

const csrf=document.getElementsByName('csrfmiddlewaretoken');
uploadBtn.addEventListener('click',()=>{
    progressBox.classList.remove('not-visible')
    cancelBox.classList.remove('not-visible')
    uploadBox.classList.remove('visible')
    uploadBox.classList.add('not-visible')

    const img_data=input.files[0]
    const url=URL.createObjectURL(img_data)
    console.log(img_data)

    const fd=new FormData()
    fd.append('csrfmiddlewaretoken',csrf[0].value)
    fd.append('image',img_data)

    $.ajax({
        type:'POST',
        url:uploadform.action,
        enctype:'multipart/form-data',
        data:fd,
        beforeSend:function(){
            console.log('before')
            alertBox.innerHTML=""
            imageBox.innerHTML=""
            


        },
        xhr:function(){
            const xhr=new XMLHttpRequest();
            xhr.upload.addEventListener('progress',e=>{
                //console.log(e)
                if(e.lengthComputable){
                    const percent=e.loaded/e.total *100
                    console.log(percent)
                    progressBox.innerHTML=`<div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p>${percent.toFixed(1)}%</p>`
                }
            })
            cancelBtn.addEventListener('click',()=>{
                xhr.abort()
                setTimeout(()=>{
                    uploadform.reset()
                    progressBox.innerHTML="" 
                    cancelBox.classList.add('not-visible')
                    alertBox.classList.add('not-visible')
                    uploadBox.classList.remove('not-visible')
                    uploadBox.classList.add('visible')

                },2000)
              
            })
            return xhr
            
        },
        success:function(response){
            console.log(response)
            imageBox.innerHTML = `<img src="${url}" width="300px">`
            alertBox.innerHTML=`<div class="alert alert-success" role="alert">
            successfully uploaded image!
          </div>`
          cancelBox.classList.add('not-visible')
          uploadBox.classList.remove('not-visible')
          uploadBox.classList.add('visible')
        },
        error:function(error){
           console.log(error)
           alertBox.innerHTML=`<div class="alert alert-danger" role="alert">
           Oops Something Went Wrong!
         </div>`
        },
        cache:false,
        contentType:false,
        processData:false,

    })
})


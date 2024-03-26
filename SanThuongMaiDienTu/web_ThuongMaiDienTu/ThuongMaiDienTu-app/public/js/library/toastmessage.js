const notifications = document.querySelector(".notifications");

const removeToast = (toast) => {
    toast.classList.add("remove");
    setTimeout(() => toast.remove(), 500);
};
// fa-check-circle
// fa-times-circle
// fa-exclamation-circle
// fa-info-circle
const toastDetails = {
    success: {
        icon: "fa-check-circle",
        title: "Thành công: ",
    },
    error: {
        icon: "fa-times-circle",
        title: "Lỗi: ",
    },
    warning: {
        icon: "fa-exclamation-circle",
        title: "Chú ý: ",
    },
    info: {
        icon: "fa-info-circle",
        title: "Thông báo:",
    },
};
const handleCreateToast = (type, message, typeid = null, autodelete = null) => {
    if ( typeid != null && document.getElementById(typeid))
        return;
    if(autodelete != false)
        $(".auto-delete-toast").each(function(){
            $(this).remove();
        })    
    const { icon, title } = toastDetails[type];
    const toast = document.createElement("li");
    toast.id = typeid
    toast.className = `toast-design ${type} ${autodelete  == true ? "auto-delete-toast" : ""}`;
    toast.innerHTML = `<div class="column">
                          <i class="fa ${icon}"></i>
                          <span>${message}</span>
                        </div>
                        <span class="message-close" onclick="removeToast(this.parentElement)"><i class="fa-solid fa-x"></i>X</span>`
    notifications.appendChild(toast);
    setTimeout(() => removeToast(toast), 2000);
};
const clearToasts = (id = null)=>{
    const toasts = $(id ? "#"+id : ".toast-design");
    toasts.each(function(){
        // $(this).remove();
        removeToast(this)
    })
}
//buttons.forEach((button) => {
//    button.addEventListener("click", () => {
//        handleCreateToast(button.id);
//    });
//});

//handleCreateToast("success","Cập thật thông tin thành công");

//handleCreateToast("error");

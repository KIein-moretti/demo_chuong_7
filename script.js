 document.addEventListener("DOMContentLoaded", function () {

            // --- KHU VỰC KHAI BÁO BIẾN ---
            var hamburgerBtn = document.getElementById("hamburgerBtn");
            var mobileMenu = document.getElementById("mobileMenu");

            var openLienHeBtn = document.getElementById("openLienHeBtn"); // Nút trên PC
            // SỬA LỖI: Lấy trực tiếp thông qua class `.openLienHeMobile` để không bao giờ lo bị lệch Selector
            var openLienHeMobile = document.querySelector(".openLienHeMobile");
            var closeXBtn = document.getElementById("closeXBtn");
            var lienHeModal = document.getElementById("lienHeModal");

            var txtHoTen = document.getElementById("txtHoTen");
            var txtMSSV = document.getElementById("txtMSSV");
            var btnGui = document.getElementById("btnGui");
            var btnXoa = document.getElementById("btnXoa");
            var errHoTen = document.getElementById("errHoTen");
            var errMSSV = document.getElementById("errMSSV");

            var imgDiscussing = document.querySelector(".image-block img");
            var isInverted = false;


            // --- CÁC SỰ KIỆN GIAO DIỆN BỔ TRỢ (ĐÓNG/MỞ MENU & MODAL) ---
            // Bấm nút 3 gạch đóng/mở menu mobile
            if (hamburgerBtn) {
                hamburgerBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    mobileMenu.classList.toggle("show-mobile-menu");
                });
            }

            // Bấm "Liên hệ" trên PC -> Mở Modal hiển thị lên màn hình
            if (openLienHeBtn) {
                openLienHeBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    lienHeModal.style.display = "flex";
                });
            }

            // Bấm "Liên hệ" trên Mobile -> Ẩn menu dọc mobile đi, rồi bật mở Modal đè lên
            if (openLienHeMobile) {
                openLienHeMobile.addEventListener("click", function (e) {
                    e.preventDefault();
                    mobileMenu.classList.remove("show-mobile-menu");
                    lienHeModal.style.display = "flex";
                });
            }

            // Bấm dấu X để đóng Modal
            if (closeXBtn) {
                closeXBtn.addEventListener("click", function () {
                    lienHeModal.style.display = "none";
                });
            }

            // Bấm ra vùng trống mờ bên ngoài hộp thoại để đóng nhanh form
            if (lienHeModal) {
                lienHeModal.addEventListener("click", function (e) {
                    if (e.target === lienHeModal) {
                        lienHeModal.style.display = "none";
                    }
                });
            }


            /* =====================================================================
               CÂU 3 - Ý 1: Trường Họ và tên khi mất focus tự động chuyển chữ IN HOA 
               và không được để trống. Xuất thông báo yêu cầu nhập và focus lại vị trí sai (1.0đ)
               ===================================================================== */
            txtHoTen.addEventListener("blur", function () {
                var val = txtHoTen.value.trim();

                if (val === "") {
                    errHoTen.style.display = "block";
                    txtHoTen.classList.add("input-error");
                    setTimeout(function () { txtHoTen.focus(); }, 10);
                } else {
                    errHoTen.style.display = "none";
                    txtHoTen.classList.remove("input-error");
                    txtHoTen.value = val.toUpperCase();
                }
            });


            /* =====================================================================
               CÂU 3 - Ý 2: Trường MSSV gồm 10 ký tự bắt đầu bằng 3 ký tự DH5 (viết HOA). 
               Nếu sai yêu cầu nhập lại (2.0đ)
               ===================================================================== */
            btnGui.addEventListener("click", function () {
                var hoTenVal = txtHoTen.value.trim();
                var mssvVal = txtMSSV.value.trim();

                var regexMSSV = /^DH5\d{7}$/;
                var hopLe = true;

                if (hoTenVal === "") {
                    errHoTen.style.display = "block";
                    txtHoTen.classList.add("input-error");
                    txtHoTen.focus();
                    return;
                }

                if (!regexMSSV.test(mssvVal)) {
                    errMSSV.style.display = "block";
                    txtMSSV.classList.add("input-error");
                    txtMSSV.focus();
                    hopLe = false;
                } else {
                    errMSSV.style.display = "none";
                    txtMSSV.classList.remove("input-error");
                }

                if (hopLe) {
                    alert("Gửi dữ liệu liên hệ thành công!");
                    lienHeModal.style.display = "none";
                }
            });


            /* =====================================================================
               CÂU 3 - Ý 3: Viết mã Javascript thực hiện khi click vào hình discussing.jpg 
               hiện thông báo "Đảo màu hình" và invert hình. Khi click lại hiện thông báo 
               "Về mặc định" và hiện lại (1.0đ)
               ===================================================================== */
            if (imgDiscussing) {
                imgDiscussing.addEventListener("click", function () {
                    if (!isInverted) {
                        alert("Đảo màu hình");
                        imgDiscussing.style.filter = "invert(100%)";
                        isInverted = true;
                    } else {
                        alert("Về mặc định");
                        imgDiscussing.style.filter = "none";
                        isInverted = false;
                    }
                });
            }


            // --- CHỨC NĂNG PHỤ: NÚT XÓA (RESET FORM) ---
            btnXoa.addEventListener("click", function () {
                if (confirm("Bạn muốn xóa sạch nội dung chứ?")) {
                    txtHoTen.value = "";
                    txtMSSV.value = "";
                    document.getElementById("txtLoiNhan").value = "";

                    errHoTen.style.display = "none";
                    errMSSV.style.display = "none";
                    txtHoTen.classList.remove("input-error");
                    txtMSSV.classList.remove("input-error");
                }
            });
        });
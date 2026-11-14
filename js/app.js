        // ============================================================================
        // GLOBAL CONSTANTS & STATE
        // ============================================================================
        const ROOM_W = 9.6;
        const ROOM_D = 9.0;
        const ROOM_H = 3.8;

        let scene, camera, renderer, controls;
        let ceilingFans = [];
        let boardWings = []; // sliding green chalkboard wings beside the TV
        let classroomDoors = []; // hinged connected 2-leaf blue classroom doors ("Lớp 5A")
        let doorMode = 'outward'; // 'outward' | 'inward' | 'closed'
        let blueDoorLeafMaterial = null;
        let happyDoorLeafMaterial = null;
        let happyDoorTulipMaterial = null;
        let lop5ASignMaterial = null;
        let gocXanhBoardMaterial = null;
        let winFlowerBoxMaterial = null;
        let grassFlowersBorderMaterial = null;
        let vuonHoaThiDuaMaterial = null;
        let hanhViTichCucMaterial = null;
        let gocBinhTinhMaterial = null;
        let bangTongKetMaterial = null;
        let docSachBannerMaterial = null;
        let noiQuyDocSachMaterial = null;
        let sangTaoBannerMaterial = null;
        let sangTaoPegMaterial = null;
        let noiQuySangTaoMaterial = null;
        let docSachShelfFrontMaterial = null;
        let sanPhamStMaterial = null;
        let sangTaoCabFrontMaterial = null;
        let hopThuBoxMaterial = null;
        let hopThuTrayMaterial = null;
        let gocSinhNhatMaterial = null;
        let hopThuDieuUocMaterial = null;
        let chauCaySinhNhatMaterial = null;
        let thungRacFrontMaterial = null;
        let firstAidCabinetGroup = null;
        let firstAidDoorPivot = null;
        let firstAidOpen = false;
        let lowerCabinetDoors = []; // interactive hinged doors on Kệ nước uống & Trạm vệ sinh cá nhân
        let waterCabOpen = false;
        let hygieneCabOpen = false;
        let noiQuyLopMaterial = null;
        let noiQuyDienMaterial = null;
        let wallLightSwitchGroup = null;
        let wallFanSwitchGroup = null;
        let wallLightRocker = null;
        let wallFanRocker = null;
        let wallLightLedMat = null;
        let wallFanLedMat = null;
        let guideBarsVisible = true;
        let roomTubeLights = [];
        let bulbEmissiveMaterials = [];
        let uncleHoPortraitMaterial = null;
        let tienHocLeMaterial = null;
        let fiveTeachingsBoardMaterial = null;
        let letterQuoteBoardMaterial = null;

        // Swivel Teacher Office Chair state & Raycaster
        let teacherChairSwivelGroup = null;
        let teacherChairTargetYaw = 0.25;
        let teacherChairAutoOscillate = true;
        const raycaster = new THREE.Raycaster();
        const pointerDownPos = new THREE.Vector2();
        const pointerUpPos = new THREE.Vector2();

        let fansSpinning = true;
        let lightsOn = true;
        let showHotspots = true;
        let cameraTween = null;

        // Camera Presets for instant smooth navigation
        const CAMERA_PRESETS = {
            exterior: {
                pos: new THREE.Vector3(-8.5, 6.2, 19.5),
                target: new THREE.Vector3(-4.5, 1.8, 0.0)
            },
            overview: {
                pos: new THREE.Vector3(0.0, 2.25, 4.15),
                target: new THREE.Vector3(0.0, 1.45, -2.5)
            },
            podium: {
                pos: new THREE.Vector3(-1.45, 1.68, -0.55),
                target: new THREE.Vector3(-2.65, 1.32, -4.1)
            },
            backWall: {
                pos: new THREE.Vector3(0.0, 1.75, -0.85),
                target: new THREE.Vector3(0.0, 1.55, 4.45)
            },
            calmCorner: {
                pos: new THREE.Vector3(-0.75, 1.52, 1.35),
                target: new THREE.Vector3(-0.75, 1.42, 4.45)
            },
            creative: {
                pos: new THREE.Vector3(3.25, 1.48, 1.55),
                target: new THREE.Vector3(3.35, 1.25, 4.45)
            },
            reading: {
                pos: new THREE.Vector3(-3.55, 1.48, 1.55),
                target: new THREE.Vector3(-3.68, 1.25, 4.45)
            },
            hopThuSinhNhat: {
                pos: new THREE.Vector3(-1.15, 1.58, 2.25),
                target: new THREE.Vector3(-4.78, 1.45, 2.25)
            },
            desks: {
                pos: new THREE.Vector3(-1.35, 1.28, 1.35),
                target: new THREE.Vector3(0.0, 0.62, 0.05)
            },
            corridor5A: {
                pos: new THREE.Vector3(9.15, 1.48, -0.35),
                target: new THREE.Vector3(4.85, 1.42, -0.35)
            },
            waterHygiene: {
                pos: new THREE.Vector3(2.85, 1.05, -0.52),
                target: new THREE.Vector3(4.62, 0.68, -0.52)
            },
            door5A: {
                pos: new THREE.Vector3(8.15, 1.42, -2.05),
                target: new THREE.Vector3(4.80, 1.32, -2.15)
            }
        };

        // Interactive 3D Hotspots Data
        const HOTSPOTS_DATA = [
            {
                id: 'noiQuyDien',
                title: 'Nội Quy Lớp Học và Công Tắc Điện',
                icon: '⚡',
                pos: new THREE.Vector3(3.35, 1.85, -4.35),
                camPreset: 'overview',
                desc: 'Bộ 2 bảng khung gỗ tự nhiên gồm Nội quy lớp học (5 điều do học sinh xây dựng) và Nội quy sử dụng thiết bị điện trong lớp, đi kèm bộ công tắc điện 3D gắn tường ngay bên cạnh để bật/tắt đèn và quạt trực tiếp.',
                tags: ['Nội quy lớp học', 'An toàn điện', 'Công tắc Đèn & Quạt 3D']
            },
            {
                id: 'uncleHoBoard',
                title: 'Chân dung Bác Hồ, Bảng Từ Xanh & Vườn Hoa Thi Đua Dọc',
                icon: '🇻🇳',
                pos: new THREE.Vector3(-0.14, 3.05, -4.38),
                camPreset: 'podium',
                desc: 'Chân dung Chủ tịch Hồ Chí Minh treo trang trọng sát trần nhà, bên dưới là khẩu hiệu "TIÊN HỌC LỄ - HẬU HỌC VĂN", bảng từ xanh 4 cánh trượt kết hợp Tivi thông minh và bảng "Vườn hoa thi đua (Nhóm 1 – Nhóm 6)" kèm hộp Hoa cá nhân & Sao hợp tác dán dọc đứng trực tiếp trên cánh bảng xanh phía sau bên trái (khi đẩy cánh bảng trượt thứ 2 sang sẽ che gọn Vườn hoa thi đua).',
                tags: ['Chân dung Bác Hồ', 'Bảng từ xanh & Tivi', 'Vườn hoa thi đua dán dọc']
            },
            {
                id: 'fiveTeachings',
                title: '5 Điều Bác Hồ Dạy và Bàn Giáo Viên',
                icon: '💺',
                pos: new THREE.Vector3(-2.85, 1.95, -4.15),
                camPreset: 'podium',
                desc: 'Bộ bảng đôi "5 Điều Bác Hồ Dạy Thiếu Niên Nhi Đồng" & "Trích thư Hồ Chủ Tịch" chữ sắc nét không dính chữ, tủ hồ sơ 2 cánh kính có cây trầu bà rủ lá, bàn giáo viên chân sắt hộp chữ U và ghế văn phòng xoay 360° bọc nỉ xanh dương (Click vào ghế để xoay!).',
                tags: ['Ghế văn phòng xoay 360°', '5 Điều Bác Hồ Dạy HD', 'Tủ kính & Hoa hồng']
            },
            {
                id: 'firstAidBoxSpot',
                title: 'Hộp Y Tế',
                icon: '➕',
                pos: new THREE.Vector3(-2.14, 1.38, -4.38),
                camPreset: 'podium',
                desc: 'Hộp y tế 3D gắn tường sát cạnh trái bảng từ xanh giúp không gian phía sau ghế giáo viên thông thoáng, không bị đụng khi ngồi hoặc xoay ghế. Cửa kính có bản lề đóng/mở trực tiếp với 2 tầng kệ đựng đầy đủ bông gòn, tăm bông, băng cá nhân, cồn y tế, thuốc sát trùng, băng gạc và găng tay.',
                tags: ['Hộp Y Tế']
            },
            {
                id: 'waterHygieneSpot',
                title: 'Kệ Nước Uống và Trạm Vệ Sinh Cá Nhân',
                icon: '🚰',
                pos: new THREE.Vector3(4.58, 0.95, -0.52),
                camPreset: 'waterHygiene',
                desc: 'Kệ nước uống (bình nước 20L có vòi và mực nước, khay 5 ca nước có quai cầm, chậu trầu bà rủ lá, cuộn khăn giấy lau) và Trạm vệ sinh cá nhân (bồn rửa tay sứ trắng lòng sâu, vòi inox, 3 chai nước rửa tay, khăn xếp, cuộn giấy lau tay). Cả 2 tủ ngăn dưới đều có thể click để mở/đóng cánh tủ xem các vật dụng dự trữ bên trong!',
                tags: ['Mở được 2 tủ ngăn dưới', 'Bình nước và Ca nước', 'Bồn rửa tay và Khăn giấy']
            },
            {
                id: 'calmAndBehavior',
                title: 'Góc Bình Tĩnh, Bảng Tổng Kết Thi Đua & Hành Vi Tích Cực',
                icon: '🧘',
                pos: new THREE.Vector3(-0.02, 1.45, 4.35),
                camPreset: 'calmCorner',
                desc: 'Khu vực trung tâm phía sau lớp gồm bảng "Góc Bình Tĩnh" đặt sát kệ gỗ 6 ô bên dưới, kết hợp "Bảng tổng kết thi đua (Nhóm 1 – Nhóm 6)" và bảng "Em lựa chọn hành vi tích cực".',
                tags: ['Góc bình tĩnh', 'Bảng tổng kết thi đua', 'Hành vi tích cực']
            },
            {
                id: 'readingCorner',
                title: 'Góc Đọc Sách – Đọc Sách Là Nuôi Dưỡng Ước Mơ',
                icon: '📚',
                pos: new THREE.Vector3(-3.68, 1.65, 4.25),
                camPreset: 'reading',
                desc: 'Góc đọc sách phía sau lớp: kệ gỗ 3 tầng phân loại (Báo, tạp chí & Văn học; Khoa học – STEM; Truyện lịch sử / Danh nhân), quả địa cầu, bảng Nội quy góc đọc sách, thảm xanh da trời và 3 đệm hoa 6 cánh.',
                tags: ['Kệ sách 3 tầng', 'Nội quy góc đọc sách']
            },
            {
                id: 'creativeCorner',
                title: 'Góc Sáng Tạo Và Thùng Rác Phân Loại',
                icon: '🎨',
                pos: new THREE.Vector3(3.45, 1.65, 4.25),
                camPreset: 'creative',
                desc: 'Góc sáng tạo phía sau lớp: bảng pegboard treo kéo, súng bắn keo, băng keo và 4 giỏ bút màu; bàn 2 tầng trưng bày 4 mô hình (Tuabin gió, Robot thông minh, Ngôi nhà xanh, Tên lửa), 4 khay học liệu, bảng Nội quy góc sáng tạo và Thùng rác xanh.',
                tags: ['Mô hình STEM', 'Khay học liệu']
            },
            {
                id: 'studentDesks',
                title: '6 Bàn Nhóm Học Sinh',
                icon: '🪑',
                pos: new THREE.Vector3(0.20, 0.88, 0.15),
                camPreset: 'desks',
                desc: '6 bộ bàn nhóm hình chữ nhật bo góc mặt gỗ vàng mật ong chân sắt tròn sơn bạc (Nhóm 1 đến Nhóm 6), mỗi bàn gồm 6 ghế học sinh xếp quay quanh bàn và 1 chậu cây xanh đặt chính giữa mặt bàn.',
                tags: ['6 Bàn nhóm']
            },
            {
                id: 'door5A',
                title: 'Cửa Lớp 5A Và Lớp Học Hạnh Phúc',
                icon: '🚪',
                pos: new THREE.Vector3(4.95, 1.45, -1.85),
                camPreset: 'door5A',
                desc: 'Cửa đôi 2 cánh nối liền màu xanh lam kèm ô kính thông gió phía trên. Cánh trái trang trí bảng "LỚP HỌC HẠNH PHÚC", 8 nhãn điều tốt đẹp và vườn hoa tulip; cánh phải có 15 ô kính 3×5. Có thể mở ra bên ngoài hành lang, đẩy vào bên trong lớp hoặc đóng kín.',
                tags: ['Mở ra/ đóng vào', 'Lớp Học Hạnh Phúc']
            },
            {
                id: 'corridorGarden5A',
                title: 'Bảng Phân Công Trực Nhật và Khu Vườn Trước Lớp 5A',
                icon: '🌺',
                pos: new THREE.Vector3(5.05, 1.65, 0.55),
                camPreset: 'corridor5A',
                desc: 'Khung cảnh hành lang phía trước Lớp 5A gồm biển chào "LỚP 5A - Mỗi ngày đến lớp là một hành trình khám phá và trưởng thành", bảng "PHÂN CÔNG TRỰC NHẬT VÀ CHĂM SÓC MÔI TRƯỜNG LỚP HỌC - Tuần 1" (Nhóm 1–6: Trực lớp, Trực hành lang, Chăm sóc cây xanh), cửa sổ 3 ô màu xanh lam treo 3 chậu trầu bà rủ, bồn hoa gạch đá xám có hàng rào trắng và các chậu cây cảnh xanh tươi.',
                tags: ['Bảng Lớp 5A', 'Bảng phân công trực nhật']
            }
        ];

        // ============================================================================
        // SAFE FILE UPLOAD HANDLERS FOR UNCLE HO PORTRAIT & 5 TEACHINGS POSTER
        // ============================================================================
        function triggerUncleHoUpload() {
            let input = document.getElementById('uncle-ho-file-input');
            if (!input) {
                input = document.createElement('input');
                input.id = 'uncle-ho-file-input';
                input.type = 'file';
                input.accept = 'image/*';
                input.className = 'hidden';
                input.onchange = handleUncleHoFileUpload;
                document.body.appendChild(input);
            }
            input.click();
        }

        function handleUncleHoFileUpload(event) {
            const file = event && event.target && event.target.files ? event.target.files[0] : null;
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = 600;
                    canvas.height = 800;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, 600, 800);
                    ctx.drawImage(img, 0, 0, 600, 800);

                    const newTex = new THREE.CanvasTexture(canvas);
                    newTex.encoding = THREE.sRGBEncoding;
                    newTex.anisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 8;
                    if (uncleHoPortraitMaterial) {
                        uncleHoPortraitMaterial.map = newTex;
                        uncleHoPortraitMaterial.needsUpdate = true;
                    }
                    showToast('Đã áp dụng ảnh Bác Hồ gốc từ máy của bạn!');
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        function triggerFiveTeachingsUpload() {
            let input = document.getElementById('five-teachings-file-input');
            if (!input) {
                input = document.createElement('input');
                input.id = 'five-teachings-file-input';
                input.type = 'file';
                input.accept = 'image/*';
                input.className = 'hidden';
                input.onchange = handleFiveTeachingsFileUpload;
                document.body.appendChild(input);
            }
            input.click();
        }

        function handleFiveTeachingsFileUpload(event) {
            const file = event && event.target && event.target.files ? event.target.files[0] : null;
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const maxAniso = renderer ? renderer.capabilities.getMaxAnisotropy() : 8;
                    // Check if uploaded image is a double-panel image (width > height)
                    if (img.width > img.height * 1.1) {
                        const halfW = img.width / 2;

                        const cLeft = document.createElement('canvas');
                        cLeft.width = 1200; cLeft.height = 1640;
                        cLeft.getContext('2d').drawImage(img, 0, 0, halfW, img.height, 0, 0, 1200, 1640);
                        const texL = new THREE.CanvasTexture(cLeft);
                        texL.encoding = THREE.sRGBEncoding;
                        texL.anisotropy = maxAniso;

                        const cRight = document.createElement('canvas');
                        cRight.width = 1200; cRight.height = 1640;
                        cRight.getContext('2d').drawImage(img, halfW, 0, halfW, img.height, 0, 0, 1200, 1640);
                        const texR = new THREE.CanvasTexture(cRight);
                        texR.encoding = THREE.sRGBEncoding;
                        texR.anisotropy = maxAniso;

                        if (fiveTeachingsBoardMaterial) {
                            fiveTeachingsBoardMaterial.map = texL;
                            fiveTeachingsBoardMaterial.needsUpdate = true;
                        }
                        if (letterQuoteBoardMaterial) {
                            letterQuoteBoardMaterial.map = texR;
                            letterQuoteBoardMaterial.needsUpdate = true;
                        }
                    } else {
                        const cSingle = document.createElement('canvas');
                        cSingle.width = 1200; cSingle.height = 1640;
                        cSingle.getContext('2d').drawImage(img, 0, 0, 1200, 1640);
                        const texS = new THREE.CanvasTexture(cSingle);
                        texS.encoding = THREE.sRGBEncoding;
                        texS.anisotropy = maxAniso;
                        if (fiveTeachingsBoardMaterial) {
                            fiveTeachingsBoardMaterial.map = texS;
                            fiveTeachingsBoardMaterial.needsUpdate = true;
                        }
                    }
                    showToast('Đã cập nhật bảng 5 Điều Bác Hồ Dạy từ ảnh của bạn!');
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        // ============================================================================
        // EMBEDDED REAL IMAGES: PORTRAIT OF UNCLE HO & "5 ĐIỀU BÁC HỒ DẠY" POSTER PAIR
        // ============================================================================
        const UNCLE_HO_IMG_SRC = 'images/uncle_ho.jpg';
        const FIVE_TEACHINGS_IMG_SRC = 'images/five_teachings.jpg';

        function loadEmbeddedImage(src, onLoad) {
            const img = new Image();
            img.onload = () => onLoad(img);
            img.src = src;
        }

        function imageToTexture(img, sx, sy, sw, sh, outW, outH) {
            const c = document.createElement('canvas');
            c.width = Math.max(sw, outW || sw);
            c.height = Math.max(sh, outH || sh);
            const g = c.getContext('2d');
            g.imageSmoothingEnabled = true;
            g.imageSmoothingQuality = 'high';
            g.fillStyle = '#ffffff';
            g.fillRect(0, 0, c.width, c.height);
            g.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
            const t = new THREE.CanvasTexture(c);
            t.encoding = THREE.sRGBEncoding;
            t.minFilter = THREE.LinearMipmapLinearFilter;
            t.magFilter = THREE.LinearFilter;
            t.anisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 16;
            return t;
        }

        const LOP_5A_SIGN_IMG_SRC = 'images/lop_5a_sign.jpg';
        const GOC_XANH_BOARD_IMG_SRC = 'images/goc_xanh_board.jpg';
        const HAPPY_DOOR_LEAF_IMG_SRC = 'images/happy_door_leaf.jpg';
        const HAPPY_DOOR_TULIP_IMG_SRC = 'images/happy_door_tulip.jpg';
        const WIN_FLOWER_BOX_IMG_SRC = 'images/win_flower_box.jpg';
        const HANH_VI_TICH_CUC_IMG_SRC = 'images/hanh_vi_tich_cuc.jpg';
        const GOC_BINH_TINH_IMG_SRC = 'images/goc_binh_tinh.jpg';
        const BANG_TONG_KET_IMG_SRC = 'images/bang_tong_ket.jpg';
        const DOC_SACH_BANNER_IMG_SRC = 'images/doc_sach_banner.jpg';
        const NOI_QUY_DOC_SACH_IMG_SRC = 'images/noi_quy_doc_sach.jpg';
        const SANG_TAO_BANNER_IMG_SRC = 'images/sang_tao_banner.jpg';
        const SANG_TAO_PEG_IMG_SRC = 'images/sang_tao_peg.jpg';
        const NOI_QUY_SANG_TAO_IMG_SRC = 'images/noi_quy_sang_tao.jpg';
        const DOC_SACH_SHELF_FRONT_IMG_SRC = 'images/doc_sach_shelf_front.jpg';
        const SAN_PHAM_ST_IMG_SRC = 'images/san_pham_st.jpg';
        const SANG_TAO_CAB_FRONT_IMG_SRC = 'images/sang_tao_cab_front.jpg';
        const HOP_THU_BOX_IMG_SRC = 'images/hop_thu_box.jpg';
        const HOP_THU_TRAY_IMG_SRC = 'images/hop_thu_tray.jpg';
        const GOC_SINH_NHAT_IMG_SRC = 'images/goc_sinh_nhat.jpg';
        const HOP_THU_DIEU_UOC_IMG_SRC = 'images/hop_thu_dieu_uoc.jpg';
        const CHAU_CAY_SINH_NHAT_IMG_SRC = 'images/chau_cay_sinh_nhat.jpg';
        const THUNG_RAC_FRONT_IMG_SRC = 'images/thung_rac_front.jpg';
        const VUON_HOA_THI_DUA_IMG_SRC = 'images/vuon_hoa_thi_dua.png';
        const TIEN_HOC_LE_IMG_SRC = 'images/tien_hoc_le.jpg';
        const NOI_QUY_LOP_IMG_SRC = 'images/noi_quy_lop.jpg';
        const NOI_QUY_DIEN_IMG_SRC = 'images/noi_quy_dien.jpg';
        const GRASS_FLOWERS_BORDER_IMG_SRC = 'images/grass_flowers_border.jpg';
        const BLUE_DOOR_LEAF_IMG_SRC = 'images/blue_door_leaf.jpg';

        function applyEmbeddedImages() {
            loadEmbeddedImage(BLUE_DOOR_LEAF_IMG_SRC, (img) => {
                if (!blueDoorLeafMaterial) return;
                blueDoorLeafMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 512, 1200);
                blueDoorLeafMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(HAPPY_DOOR_LEAF_IMG_SRC, (img) => {
                if (!happyDoorLeafMaterial) return;
                happyDoorLeafMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 420, 1060);
                happyDoorLeafMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(LOP_5A_SIGN_IMG_SRC, (img) => {
                if (!lop5ASignMaterial) return;
                lop5ASignMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 512, 368);
                lop5ASignMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(GOC_XANH_BOARD_IMG_SRC, (img) => {
                if (!gocXanhBoardMaterial) return;
                gocXanhBoardMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 840, 1058);
                gocXanhBoardMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(HAPPY_DOOR_TULIP_IMG_SRC, (img) => {
                if (!happyDoorTulipMaterial) return;
                happyDoorTulipMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 360, 910);
                happyDoorTulipMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(WIN_FLOWER_BOX_IMG_SRC, (img) => {
                if (!winFlowerBoxMaterial) return;
                winFlowerBoxMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 560, 148);
                winFlowerBoxMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(GRASS_FLOWERS_BORDER_IMG_SRC, (img) => {
                if (!grassFlowersBorderMaterial) return;
                grassFlowersBorderMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 560, 84);
                grassFlowersBorderMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(HANH_VI_TICH_CUC_IMG_SRC, (img) => {
                if (!hanhViTichCucMaterial) return;
                hanhViTichCucMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 720, 480);
                hanhViTichCucMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(GOC_BINH_TINH_IMG_SRC, (img) => {
                if (!gocBinhTinhMaterial) return;
                gocBinhTinhMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 720, 405);
                gocBinhTinhMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(BANG_TONG_KET_IMG_SRC, (img) => {
                if (!bangTongKetMaterial) return;
                bangTongKetMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 560, 380);
                bangTongKetMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(DOC_SACH_BANNER_IMG_SRC, (img) => {
                if (!docSachBannerMaterial) return;
                docSachBannerMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 480, 182);
                docSachBannerMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(NOI_QUY_DOC_SACH_IMG_SRC, (img) => {
                if (!noiQuyDocSachMaterial) return;
                noiQuyDocSachMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 260, 292);
                noiQuyDocSachMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(SANG_TAO_BANNER_IMG_SRC, (img) => {
                if (!sangTaoBannerMaterial) return;
                sangTaoBannerMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 500, 138);
                sangTaoBannerMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(SANG_TAO_PEG_IMG_SRC, (img) => {
                if (!sangTaoPegMaterial) return;
                sangTaoPegMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 480, 220);
                sangTaoPegMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(NOI_QUY_SANG_TAO_IMG_SRC, (img) => {
                if (!noiQuySangTaoMaterial) return;
                noiQuySangTaoMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 260, 324);
                noiQuySangTaoMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(DOC_SACH_SHELF_FRONT_IMG_SRC, (img) => {
                if (!docSachShelfFrontMaterial) return;
                docSachShelfFrontMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                docSachShelfFrontMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(SAN_PHAM_ST_IMG_SRC, (img) => {
                if (!sanPhamStMaterial) return;
                sanPhamStMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                sanPhamStMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(SANG_TAO_CAB_FRONT_IMG_SRC, (img) => {
                if (!sangTaoCabFrontMaterial) return;
                sangTaoCabFrontMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                sangTaoCabFrontMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(HOP_THU_BOX_IMG_SRC, (img) => {
                if (!hopThuBoxMaterial) return;
                hopThuBoxMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                hopThuBoxMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(HOP_THU_TRAY_IMG_SRC, (img) => {
                if (!hopThuTrayMaterial) return;
                hopThuTrayMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                hopThuTrayMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(GOC_SINH_NHAT_IMG_SRC, (img) => {
                if (!gocSinhNhatMaterial) return;
                gocSinhNhatMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                gocSinhNhatMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(HOP_THU_DIEU_UOC_IMG_SRC, (img) => {
                if (!hopThuDieuUocMaterial) return;
                hopThuDieuUocMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                hopThuDieuUocMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(CHAU_CAY_SINH_NHAT_IMG_SRC, (img) => {
                if (!chauCaySinhNhatMaterial) return;
                chauCaySinhNhatMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                chauCaySinhNhatMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(THUNG_RAC_FRONT_IMG_SRC, (img) => {
                if (!thungRacFrontMaterial) return;
                thungRacFrontMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 280, 312);
                thungRacFrontMaterial.needsUpdate = true;
            });
            loadEmbeddedImage(VUON_HOA_THI_DUA_IMG_SRC, (img) => {
                if (!vuonHoaThiDuaMaterial) return;
                vuonHoaThiDuaMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                vuonHoaThiDuaMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(NOI_QUY_LOP_IMG_SRC, (img) => {
                if (!noiQuyLopMaterial) return;
                noiQuyLopMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                noiQuyLopMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(TIEN_HOC_LE_IMG_SRC, (img) => {
                if (!tienHocLeMaterial) return;
                tienHocLeMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, img.width, img.height);
                tienHocLeMaterial.needsUpdate = true;
            });

            loadEmbeddedImage(NOI_QUY_DIEN_IMG_SRC, (img) => {
                if (!noiQuyDienMaterial) return;
                noiQuyDienMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 560, 382);
                noiQuyDienMaterial.needsUpdate = true;
            });

            // Portrait of Uncle Ho (full image includes its own wooden frame, white mat & caption)
            loadEmbeddedImage(UNCLE_HO_IMG_SRC, (img) => {
                if (!uncleHoPortraitMaterial) return;
                uncleHoPortraitMaterial.map = imageToTexture(img, 0, 0, img.width, img.height, 600, 822);
                uncleHoPortraitMaterial.needsUpdate = true;
            });

            // Poster pair: left half = "5 Điều Bác Hồ Dạy", right half = "Trích thư Hồ Chủ Tịch"
            loadEmbeddedImage(FIVE_TEACHINGS_IMG_SRC, (img) => {
                const halfW = img.width / 2;
                const left = imageToTexture(img, 0, 0, halfW, img.height, 1200, 1640);
                const right = imageToTexture(img, halfW, 0, halfW, img.height, 1200, 1640);
                if (fiveTeachingsBoardMaterial) {
                    fiveTeachingsBoardMaterial.map = left;
                    fiveTeachingsBoardMaterial.needsUpdate = true;
                }
                if (letterQuoteBoardMaterial) {
                    letterQuoteBoardMaterial.map = right;
                    letterQuoteBoardMaterial.needsUpdate = true;
                }
            });
        }

        function updateBoardStateLabel() {
            const el = document.getElementById('board-state-text');
            if (!el) return;
            const closed = boardWings.filter((w) => w.userData.target === 1).length;
            el.textContent = closed === 0 ? 'Hiện' : (closed === boardWings.length ? 'Che' : 'Che một phần');
            el.className = closed === 0 ? 'text-emerald-400 font-bold' : 'text-amber-300 font-bold';
        }

        function toggleBoardWing(wing) {
            wing.userData.target = wing.userData.target ? 0 : 1;
            updateBoardStateLabel();
        }

        function toggleBoardWings() {
            const allClosed = boardWings.every((w) => w.userData.target === 1);
            boardWings.forEach((w) => { w.userData.target = allClosed ? 0 : 1; });
            updateBoardStateLabel();
        }

        function updateDoorStateLabel() {
            const el = document.getElementById('door-state-text');
            if (!el) return;
            if (doorMode === 'outward') {
                el.textContent = 'Đang mở';
                el.className = 'text-emerald-300 font-bold';
            } else {
                el.textContent = 'Đã đóng';
                el.className = 'text-amber-300 font-bold';
            }
        }

        function setClassroomDoorsMode(mode) {
            doorMode = mode === 'outward' ? 'outward' : 'closed';
            classroomDoors.forEach((d) => {
                if (!d.userData) return;
                if (doorMode === 'outward') {
                    d.userData.targetAngle = d.userData.outwardRotY;
                    d.userData.targetX = d.userData.outwardX;
                } else {
                    d.userData.targetAngle = d.userData.closedRotY;
                    d.userData.targetX = d.userData.closedX;
                }
            });
            updateDoorStateLabel();
            if (doorMode === 'outward') {
                showToast('🚪 Đã mở 2 cánh cửa Lớp 5A hướng ra ngoài hành lang!');
            } else {
                showToast('🔒 Đã đóng kín 2 cánh cửa Lớp 5A!');
            }
        }

        function toggleSingleClassroomDoor(doorPivot) {
            if (!doorPivot || !doorPivot.userData) return;
            const nextMode = doorMode === 'outward' ? 'closed' : 'outward';
            setClassroomDoorsMode(nextMode);
        }

        function toggleClassroomDoors() {
            const nextMode = doorMode === 'outward' ? 'closed' : 'outward';
            setClassroomDoorsMode(nextMode);
        }

        function toggleGuideBars() {
            guideBarsVisible = !guideBarsVisible;
            const topHeader = document.getElementById('top-guide-header');
            const bottomNav = document.getElementById('bottom-guide-nav');
            const hotspotsLayer = document.getElementById('hotspots-layer');
            const restoreFab = document.getElementById('show-guide-bars-fab');

            if (topHeader) {
                topHeader.style.opacity = guideBarsVisible ? '1' : '0';
                topHeader.classList.toggle('hidden', !guideBarsVisible);
            }
            if (bottomNav) {
                bottomNav.style.opacity = guideBarsVisible ? '1' : '0';
                bottomNav.style.pointerEvents = guideBarsVisible ? 'auto' : 'none';
                bottomNav.classList.toggle('hidden', !guideBarsVisible);
            }
            if (hotspotsLayer) {
                hotspotsLayer.classList.toggle('hidden', !guideBarsVisible);
            }
            if (!guideBarsVisible) {
                closeInfoCard();
            }
            if (restoreFab) {
                restoreFab.classList.toggle('hidden', guideBarsVisible);
                restoreFab.classList.toggle('flex', !guideBarsVisible);
            }
        }

        function toggleFirstAidBox() {
            firstAidOpen = !firstAidOpen;
            if (firstAidDoorPivot && firstAidDoorPivot.userData) {
                firstAidDoorPivot.userData.targetRotY = firstAidOpen ? -1.68 : 0.0;
            }
            const el = document.getElementById('firstaid-state-text');
            if (el) {
                el.textContent = firstAidOpen ? 'Đang mở' : 'Đóng';
                el.className = firstAidOpen ? 'text-emerald-300 font-bold' : 'text-amber-200 font-bold';
            }
            showToast(firstAidOpen ? '➕ Đã mở cửa Hộp y tế' : '➕ Đã đóng cửa Hộp y tế');
        }

        function updateLowerCabinetsStateLabel() {
            const el = document.getElementById('lower-cabs-state-text');
            if (!el) return;
            const anyOpen = waterCabOpen || hygieneCabOpen;
            const bothOpen = waterCabOpen && hygieneCabOpen;
            el.textContent = bothOpen ? 'Đang mở' : (anyOpen ? 'Mở 1 tủ' : 'Đóng');
            el.className = anyOpen ? 'text-emerald-300 font-bold' : 'text-amber-200 font-bold';
        }

        function setCabinetDoorsState(cabinetGroupKey, isOpen) {
            if (cabinetGroupKey === 'water') waterCabOpen = isOpen;
            if (cabinetGroupKey === 'hygiene') hygieneCabOpen = isOpen;
            lowerCabinetDoors.forEach((pivot) => {
                if (pivot.userData && pivot.userData.cabinetKey === cabinetGroupKey) {
                    pivot.userData.isOpen = isOpen;
                    pivot.userData.targetRotY = isOpen ? pivot.userData.openRotY : 0.0;
                }
            });
            updateLowerCabinetsStateLabel();
        }

        function toggleSingleLowerCabinetDoor(pivot) {
            if (!pivot || !pivot.userData) return;
            const key = pivot.userData.cabinetKey;
            const nextState = key === 'water' ? !waterCabOpen : !hygieneCabOpen;
            setCabinetDoorsState(key, nextState);
            const name = key === 'water' ? 'Tủ dưới Kệ nước uống' : 'Tủ dưới Trạm vệ sinh cá nhân';
            showToast(nextState ? `🗄️ Đã mở ${name}!` : `🗄️ Đã đóng ${name}!`);
        }

        function toggleLowerCabinets() {
            const nextState = !(waterCabOpen && hygieneCabOpen);
            setCabinetDoorsState('water', nextState);
            setCabinetDoorsState('hygiene', nextState);
            showToast(nextState ? '🗄️ Đã mở 2 tủ ngăn dưới' : '🗄️ Đã đóng cả 2 tủ ngăn dưới');
        }

        function spinTeacherChairAction() {
            teacherChairAutoOscillate = false;
            teacherChairTargetYaw += Math.PI * 0.65;
            showToast('💺Ghế giáo viên');
        }

        function showToast(msg) {
            const toast = document.getElementById('toast-msg');
            if (!toast) return;
            toast.textContent = msg;
            toast.classList.remove('opacity-0');
            toast.classList.add('opacity-100');
            setTimeout(() => {
                toast.classList.remove('opacity-100');
                toast.classList.add('opacity-0');
            }, 3200);
        }

        // ============================================================================
        // PROCEDURAL TEXTURE GENERATORS
        // ============================================================================

        // Exact Matte Plaster Wall Texture matching user's uploaded color swatch (#E5DFC5)
        function createClassroomWallPlasterTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#DFD8BC';
            ctx.fillRect(0, 0, 512, 512);

            for (let i = 0; i < 1200; i++) {
                const isLighter = i % 2 === 0;
                ctx.fillStyle = isLighter ? 'rgba(232, 226, 200, 0.25)' : 'rgba(212, 205, 176, 0.25)';
                const rx = Math.random() * 512;
                const ry = Math.random() * 512;
                const rw = 2 + Math.random() * 8;
                const rh = 2 + Math.random() * 8;
                ctx.fillRect(rx, ry, rw, rh);
            }

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(4, 2);
            tex.anisotropy = 4;
            return tex;
        }

        // Bright Daylight Sky Dome Texture (#87CEEB -> #E0F6FF)
        function createBrightSkyDomeTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            const grad = ctx.createLinearGradient(0, 0, 0, 512);
            grad.addColorStop(0.0, '#4fa8e8');
            grad.addColorStop(0.45, '#87CEEB');
            grad.addColorStop(0.75, '#dcf2ff');
            grad.addColorStop(1.0, '#d8e8d5');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 1024, 512);

            // Soft white daytime clouds
            ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
            for (let c = 0; c < 18; c++) {
                const cx = (c * 63) % 980 + 20;
                const cy = 90 + (c % 4) * 35;
                for (let p = 0; p < 4; p++) {
                    ctx.beginPath();
                    ctx.arc(cx + p * 24, cy + (p % 2) * 6, 22 + (p % 2) * 8, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            return tex;
        }

        // Soft Matte Ceramic Floor Tile Texture (glare-free)
        function createFloorTileTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#ddd6c7';
            ctx.fillRect(0, 0, 512, 512);

            for (let i = 0; i < 18; i++) {
                ctx.fillStyle = i % 2 === 0 ? 'rgba(245,240,232,0.18)' : 'rgba(198,188,172,0.16)';
                ctx.beginPath();
                ctx.ellipse(
                    Math.random() * 512,
                    Math.random() * 512,
                    40 + Math.random() * 90,
                    15 + Math.random() * 40,
                    Math.random() * Math.PI,
                    0, Math.PI * 2
                );
                ctx.fill();
            }

            ctx.strokeStyle = '#bfb6a6';
            ctx.lineWidth = 4;
            ctx.strokeRect(0, 0, 256, 256);
            ctx.strokeRect(256, 0, 256, 256);
            ctx.strokeRect(0, 256, 256, 256);
            ctx.strokeRect(256, 256, 256, 256);

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(8, 8);
            tex.anisotropy = 8;
            return tex;
        }

        // Brushed Concrete Ceiling Texture
        function createConcreteCeilingTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#b4b2ac';
            ctx.fillRect(0, 0, 512, 512);

            for (let i = 0; i < 900; i++) {
                ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(60,60,60,0.06)';
                ctx.fillRect(Math.random() * 512, Math.random() * 512, 6 + Math.random() * 18, 4 + Math.random() * 12);
            }
            ctx.strokeStyle = 'rgba(80,80,75,0.22)';
            ctx.lineWidth = 3;
            ctx.strokeRect(0, 0, 256, 256);
            ctx.strokeRect(256, 0, 256, 256);
            ctx.strokeRect(0, 256, 256, 256);
            ctx.strokeRect(256, 256, 256, 256);

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(4, 4);
            return tex;
        }

        // Natural Wood Grain Texture
        function createWoodTexture(baseHex = '#d89b52', grainHex = '#a66b28') {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = baseHex;
            ctx.fillRect(0, 0, 512, 512);

            ctx.strokeStyle = grainHex;
            for (let i = 0; i < 90; i++) {
                ctx.globalAlpha = 0.08 + Math.random() * 0.14;
                ctx.lineWidth = 1 + Math.random() * 2.5;
                ctx.beginPath();
                const y = Math.random() * 512;
                ctx.moveTo(0, y);
                ctx.bezierCurveTo(
                    170, y + (Math.random() - 0.5) * 18,
                    340, y + (Math.random() - 0.5) * 18,
                    512, y + (Math.random() - 0.5) * 8
                );
                ctx.stroke();
            }
            ctx.globalAlpha = 1.0;

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.anisotropy = 8;
            return tex;
        }

        // Golden-Honey Wood Texture specifically matching the new Student Desk & Chair photo
        function createHoneyOakWoodTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            const grad = ctx.createLinearGradient(0, 0, 512, 512);
            grad.addColorStop(0, '#e39e36');
            grad.addColorStop(0.5, '#ebac46');
            grad.addColorStop(1, '#dc942c');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 512, 512);

            ctx.strokeStyle = '#b8731a';
            for (let i = 0; i < 110; i++) {
                ctx.globalAlpha = 0.10 + Math.random() * 0.14;
                ctx.lineWidth = 0.8 + Math.random() * 2.0;
                ctx.beginPath();
                const y = Math.random() * 512;
                ctx.moveTo(0, y);
                ctx.bezierCurveTo(
                    170, y + (Math.random() - 0.5) * 14,
                    340, y + (Math.random() - 0.5) * 14,
                    512, y + (Math.random() - 0.5) * 6
                );
                ctx.stroke();
            }
            ctx.globalAlpha = 1.0;

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.anisotropy = 8;
            return tex;
        }

        // Portrait of President Ho Chi Minh (1890 - 1969) matching image_0f767b.jpg
        function createUncleHoPortraitTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 600;
            canvas.height = 800;
            const ctx = canvas.getContext('2d');

            // 1. White outer mat border
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 600, 800);

            // 2. Soft sky-blue studio backdrop
            const bgGrad = ctx.createLinearGradient(45, 42, 555, 650);
            bgGrad.addColorStop(0.0, '#d2e9f8');
            bgGrad.addColorStop(0.5, '#e5f3fc');
            bgGrad.addColorStop(1.0, '#c6e2f5');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(45, 42, 510, 610);

            // 3. Khaki tunic shoulders & collar
            ctx.save();
            ctx.beginPath();
            ctx.rect(45, 42, 510, 610);
            ctx.clip();

            const suitGrad = ctx.createLinearGradient(120, 480, 480, 660);
            suitGrad.addColorStop(0, '#eee5d3');
            suitGrad.addColorStop(0.5, '#e5dac3');
            suitGrad.addColorStop(1, '#d5c7ad');
            ctx.fillStyle = suitGrad;
            ctx.beginPath();
            ctx.moveTo(70, 660);
            ctx.quadraticCurveTo(140, 505, 235, 485);
            ctx.lineTo(365, 485);
            ctx.quadraticCurveTo(460, 505, 530, 660);
            ctx.closePath();
            ctx.fill();

            // Collar lapels
            ctx.strokeStyle = '#b5a48b';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(225, 490);
            ctx.lineTo(190, 595);
            ctx.lineTo(265, 615);
            ctx.moveTo(375, 490);
            ctx.lineTo(410, 595);
            ctx.lineTo(335, 615);
            ctx.stroke();

            // Neck
            ctx.fillStyle = '#d4956a';
            ctx.fillRect(245, 430, 110, 85);

            // Silver-white hair crown
            ctx.fillStyle = '#5a6065';
            ctx.beginPath();
            ctx.ellipse(300, 245, 138, 128, 0, Math.PI, 0);
            ctx.fill();

            // Fine silver hair strands
            for (let i = 0; i < 160; i++) {
                ctx.strokeStyle = i % 2 === 0 ? '#e2e8f0' : '#94a3b8';
                ctx.lineWidth = 1.6;
                const ang = Math.PI + (i / 160) * Math.PI;
                const r1 = 112 + (i % 7) * 2;
                const r2 = 142 + (i % 5) * 3;
                ctx.beginPath();
                ctx.moveTo(300 + Math.cos(ang) * r1, 250 + Math.sin(ang) * r1 * 0.92);
                ctx.lineTo(300 + Math.cos(ang) * r2, 250 + Math.sin(ang) * r2 * 0.92);
                ctx.stroke();
            }

            // Ears
            ctx.fillStyle = '#dfa175';
            ctx.beginPath();
            ctx.ellipse(166, 338, 22, 52, -0.08, 0, Math.PI * 2);
            ctx.ellipse(434, 338, 22, 52, 0.08, 0, Math.PI * 2);
            ctx.fill();

            // Face & high forehead
            const skinGrad = ctx.createRadialGradient(295, 290, 30, 300, 325, 165);
            skinGrad.addColorStop(0.0, '#f4c59e');
            skinGrad.addColorStop(0.55, '#e5aa7e');
            skinGrad.addColorStop(1.0, '#c9885c');
            ctx.fillStyle = skinGrad;
            ctx.beginPath();
            ctx.moveTo(175, 240);
            ctx.quadraticCurveTo(175, 135, 300, 135);
            ctx.quadraticCurveTo(425, 135, 425, 240);
            ctx.quadraticCurveTo(432, 375, 385, 445);
            ctx.quadraticCurveTo(300, 505, 215, 445);
            ctx.quadraticCurveTo(168, 375, 175, 240);
            ctx.closePath();
            ctx.fill();

            // Gentle forehead & smile lines
            ctx.strokeStyle = 'rgba(155, 92, 52, 0.35)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(235, 195); ctx.quadraticCurveTo(300, 188, 365, 195);
            ctx.moveTo(225, 215); ctx.quadraticCurveTo(300, 208, 375, 215);
            ctx.moveTo(240, 375); ctx.quadraticCurveTo(212, 405, 222, 435);
            ctx.moveTo(360, 375); ctx.quadraticCurveTo(388, 405, 378, 435);
            ctx.stroke();

            // Eyebrows (dark & silver-grey salt-and-pepper)
            ctx.fillStyle = '#475569';
            ctx.beginPath();
            ctx.ellipse(244, 272, 38, 9, -0.08, 0, Math.PI * 2);
            ctx.ellipse(356, 272, 38, 9, 0.08, 0, Math.PI * 2);
            ctx.fill();

            // Warm, bright, benevolent eyes
            [[246, 302], [354, 302]].forEach(([ex, ey]) => {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.ellipse(ex, ey, 22, 10, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#1e1b18';
                ctx.beginPath();
                ctx.arc(ex, ey, 8.5, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(ex - 3, ey - 3, 2.6, 0, Math.PI * 2);
                ctx.fill();
            });

            // Nose
            ctx.strokeStyle = '#b36f44';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(286, 302);
            ctx.lineTo(276, 366);
            ctx.quadraticCurveTo(300, 382, 324, 366);
            ctx.lineTo(314, 302);
            ctx.stroke();

            // Warm smile
            ctx.fillStyle = '#bf6952';
            ctx.beginPath();
            ctx.quadraticCurveTo(300, 442, 338, 418);
            ctx.quadraticCurveTo(300, 430, 262, 418);
            ctx.fill();

            // Mustache (salt and pepper grey/white)
            for (let m = -48; m <= 48; m += 3) {
                ctx.strokeStyle = Math.abs(m) % 6 === 0 ? '#475569' : '#e2e8f0';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(300 + m * 0.85, 392);
                ctx.lineTo(300 + m * 1.15, 422 + Math.abs(m) * 0.15);
                ctx.stroke();
            }

            // Iconic long silver-white beard
            for (let b = 0; b < 140; b++) {
                const bx = 250 + (b / 140) * 100;
                const len = 115 + Math.sin((b / 140) * Math.PI) * 75 + (b % 5) * 6;
                ctx.strokeStyle = b % 3 === 0 ? '#cbd5e1' : (b % 5 === 0 ? '#64748b' : '#f8fafc');
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(bx, 442);
                ctx.bezierCurveTo(
                    bx + (b % 2 === 0 ? -6 : 6), 495,
                    268 + (b / 140) * 64, 545,
                    276 + (b / 140) * 48, 442 + len
                );
                ctx.stroke();
            }
            ctx.restore();

            // 4. Bold Black Caption at bottom
            ctx.fillStyle = '#0f172a';
            ctx.font = '900 32px Inter, serif';
            ctx.textAlign = 'center';
            ctx.fillText('CHỦ TỊCH HỒ CHÍ MINH', 300, 712);
            ctx.font = '800 26px Inter, serif';
            ctx.fillText('(1890 - 1969)', 300, 752);

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.anisotropy = 8;
            return tex;
        }

        // ULTRA-HD Poster: "5 ĐIỀU BÁC HỒ DẠY THIẾU NIÊN NHI ĐỒNG" VÀ "Trích thư HỒ CHỦ TỊCH"
        // Fixed 100% character spacing — NO squished/overlapping text, 1200x1640 crisp resolution
        function createUncleHoPosterPairTexture(type = 'fiveTeachings') {
            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = 1640;
            const ctx = canvas.getContext('2d');

            // 1. Crisp White Background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 1200, 1640);

            // 2. Detailed Dong Son Bronze Drum Watermark in Center
            ctx.save();
            ctx.translate(600, 890);
            ctx.strokeStyle = 'rgba(234, 138, 28, 0.17)';
            ctx.fillStyle = 'rgba(234, 138, 28, 0.08)';
            for (let r = 70; r <= 460; r += 48) {
                ctx.lineWidth = (r === 358 || r === 454) ? 10 : 4;
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.stroke();
            }
            // Central 14-ray Dong Son Sunburst
            ctx.beginPath();
            for (let i = 0; i < 28; i++) {
                const rad = i % 2 === 0 ? 64 : 26;
                const ang = (i * Math.PI) / 14;
                if (i === 0) ctx.moveTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
                else ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
            }
            ctx.closePath();
            ctx.fill();
            // Radial geometric pattern ticks between rings
            for (let a = 0; a < 36; a++) {
                const ang = (a * Math.PI * 2) / 36;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(Math.cos(ang) * 166, Math.sin(ang) * 166);
                ctx.lineTo(Math.cos(ang) * 214, Math.sin(ang) * 214);
                ctx.moveTo(Math.cos(ang) * 310, Math.sin(ang) * 310);
                ctx.lineTo(Math.cos(ang) * 358, Math.sin(ang) * 358);
                ctx.stroke();
            }
            ctx.restore();

            // 3. Blue Geometric Fretwork Border + Blue Lotus at Bottom
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 10;
            ctx.strokeRect(48, 48, 1104, 1544);
            ctx.lineWidth = 5;
            ctx.strokeRect(72, 72, 1056, 1496);

            // Intricate Blue Fretwork Corners
            [[48, 48], [1024, 48], [48, 1464], [1024, 1464]].forEach(([cx, cy]) => {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(cx, cy, 128, 128);
                ctx.lineWidth = 8;
                ctx.strokeRect(cx + 8, cy + 8, 112, 112);
                ctx.lineWidth = 6;
                ctx.strokeRect(cx + 30, cy + 30, 68, 68);
                ctx.strokeRect(cx + 50, cy + 50, 28, 28);
            });

            // White break at bottom center for Blue Lotus Emblem
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(390, 1545, 420, 75);

            // Stylized Blue Lotus Emblem at Bottom Center
            ctx.fillStyle = '#0284c7';
            [0, -0.38, 0.38, -0.78, 0.78, -1.12, 1.12].forEach((ang, idx) => {
                ctx.save();
                ctx.translate(600, 1592);
                ctx.rotate(ang);
                const pLen = idx === 0 ? 60 : (idx <= 2 ? 54 : 44);
                const pWid = idx === 0 ? 22 : 18;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(-pWid, -pLen * 0.6, 0, -pLen);
                ctx.quadraticCurveTo(pWid, -pLen * 0.6, 0, 0);
                ctx.fill();
                ctx.restore();
            });

            if (type === 'fiveTeachings') {
                // 4A. Circular Emblem of Uncle Ho & Young Pioneer on Top-Left
                const badgeX = 235, badgeY = 305, badgeR = 136;
                ctx.save();
                ctx.beginPath();
                ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
                ctx.clip();

                const skyG = ctx.createLinearGradient(badgeX, badgeY - badgeR, badgeX, badgeY + badgeR);
                skyG.addColorStop(0, '#0284c7');
                skyG.addColorStop(1, '#38bdf8');
                ctx.fillStyle = skyG;
                ctx.fillRect(badgeX - badgeR, badgeY - badgeR, badgeR * 2, badgeR * 2);

                // Illustration of Uncle Ho in light cream suit on left of badge
                ctx.fillStyle = '#f5ebe0';
                ctx.beginPath();
                ctx.ellipse(badgeX - 42, badgeY + 75, 58, 92, -0.1, 0, Math.PI * 2);
                ctx.fill();
                // Uncle Ho head & silver hair/beard
                ctx.fillStyle = '#e2e8f0';
                ctx.beginPath();
                ctx.arc(badgeX - 42, badgeY - 42, 32, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#f3bfa0';
                ctx.beginPath();
                ctx.arc(badgeX - 36, badgeY - 38, 26, 0, Math.PI * 2);
                ctx.fill();
                // White beard
                ctx.fillStyle = '#f8fafc';
                ctx.beginPath();
                ctx.moveTo(badgeX - 30, badgeY - 18);
                ctx.lineTo(badgeX - 18, badgeY + 14);
                ctx.lineTo(badgeX - 42, badgeY + 8);
                ctx.fill();

                // Young Pioneer student in white shirt & red scarf on right of badge
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.ellipse(badgeX + 42, badgeY + 92, 44, 72, 0.08, 0, Math.PI * 2);
                ctx.fill();
                // Red scarf ("Khăn quàng đỏ")
                ctx.fillStyle = '#dc2626';
                ctx.beginPath();
                ctx.moveTo(badgeX + 18, badgeY + 26);
                ctx.lineTo(badgeX + 62, badgeY + 26);
                ctx.lineTo(badgeX + 34, badgeY + 68);
                ctx.closePath();
                ctx.fill();
                // Student head & dark hair
                ctx.fillStyle = '#f3bfa0';
                ctx.beginPath();
                ctx.arc(badgeX + 38, badgeY - 2, 22, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#1e293b';
                ctx.beginPath();
                ctx.arc(badgeX + 42, badgeY - 8, 22, Math.PI * 0.9, Math.PI * 2.2);
                ctx.fill();
                ctx.restore();

                ctx.strokeStyle = '#bae6fd';
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
                ctx.stroke();

                // 4B. Big Red "5"
                ctx.fillStyle = '#dc2626';
                ctx.font = '900 285px Georgia, "Times New Roman", serif';
                ctx.textAlign = 'center';
                ctx.fillText('5', 465, 395);

                // 4C. Crisp Uncompressed Header: "ĐIỀU BÁC HỒ DẠY" VÀ "THIẾU NIÊN NHI ĐỒNG"
                ctx.textAlign = 'center';
                ctx.fillStyle = '#1e3a8a';
                ctx.font = '900 54px "Segoe UI", Roboto, Inter, Arial, sans-serif';
                ctx.fillText('ĐIỀU BÁC HỒ DẠY', 825, 275);

                ctx.fillStyle = '#15803d';
                ctx.font = '800 39px "Segoe UI", Roboto, Inter, Arial, sans-serif';
                ctx.fillText('THIẾU NIÊN NHI ĐỒNG', 825, 365);

                // 4D. The 5 Teachings — Well-spaced, crisp typography, zero horizontal compression
                const teachings = [
                    ['1.', 'Yêu tổ quốc, yêu đồng bào.'],
                    ['2.', 'Học tập tốt, lao động tốt.'],
                    ['3.', 'Đoàn kết tốt, kỷ luật tốt.'],
                    ['4.', 'Giữ gìn vệ sinh thật tốt.'],
                    ['5.', 'Khiêm tốn, thật thà, dũng cảm.']
                ];

                teachings.forEach(([num, text], idx) => {
                    const rowY = 620 + idx * 192;
                    ctx.textAlign = 'left';

                    // Red number
                    ctx.fillStyle = '#dc2626';
                    ctx.font = '900 62px "Segoe UI", Roboto, Inter, Arial, sans-serif';
                    ctx.fillText(num, 96, rowY);

                    // Dark navy-blue content with generous natural spacing
                    ctx.fillStyle = '#1e3a8a';
                    ctx.font = '800 54px "Segoe UI", Roboto, Inter, Arial, sans-serif';
                    ctx.fillText(text, 192, rowY);
                });
            } else {
                // 5. Companion Poster: "... Non sông Việt Nam có trở nên tươi đẹp được hay không..."
                ctx.textAlign = 'left';

                // First line with decorative red "N"
                const line1Y = 285;
                ctx.fillStyle = '#1e3a8a';
                ctx.font = '900 56px "Segoe UI", Roboto, Inter, Arial, sans-serif';
                ctx.fillText('...', 165, line1Y);

                ctx.fillStyle = '#dc2626';
                ctx.font = '900 88px Georgia, "Times New Roman", serif';
                ctx.fillText('N', 240, line1Y + 4);

                ctx.fillStyle = '#1e3a8a';
                ctx.font = '800 54px "Segoe UI", Roboto, Inter, Arial, sans-serif';
                ctx.fillText('on sông Việt Nam có', 325, line1Y);

                const bodyLines = [
                    'trở nên tươi đẹp được hay không,',
                    'dân tộc Việt Nam có bước tới',
                    'đài vinh quang để sánh vai',
                    'với các cường quốc năm',
                    'châu được hay không, chính',
                    'là nhờ một phần lớn ở công',
                    'học tập của các em...'
                ];

                ctx.textAlign = 'center';
                ctx.fillStyle = '#1e3a8a';
                ctx.font = '800 54px "Segoe UI", Roboto, Inter, Arial, sans-serif';
                bodyLines.forEach((line, i) => {
                    ctx.fillText(line, 600, 430 + i * 142);
                });

                // Signature at bottom right
                ctx.textAlign = 'right';
                ctx.fillStyle = '#1e3a8a';
                ctx.font = 'italic 700 46px Georgia, "Times New Roman", serif';
                ctx.fillText('Trích thư HỒ CHỦ TỊCH', 1055, 1415);
            }

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.anisotropy = renderer ? renderer.capabilities.getMaxAnisotropy() : 8;
            return tex;
        }

        // First Aid Box Texture ("HỘP Y TẾ")
        function createFirstAidTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 320;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 256, 320);

            ctx.strokeStyle = '#dc2626';
            ctx.lineWidth = 8;
            ctx.strokeRect(12, 12, 232, 296);

            // Red Cross
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(108, 48, 40, 110);
            ctx.fillRect(73, 83, 110, 40);

            ctx.font = '900 38px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('HỘP', 128, 225);
            ctx.fillText('Y TẾ', 128, 272);

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            return tex;
        }

        // Green Chalkboard Texture with faint grid & subtle chalk dust
        function createChalkboardTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#124e35';
            ctx.fillRect(0, 0, 512, 512);

            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 512; i += 32) {
                ctx.beginPath();
                ctx.moveTo(i, 0); ctx.lineTo(i, 512);
                ctx.moveTo(0, i); ctx.lineTo(512, i);
                ctx.stroke();
            }

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            return tex;
        }

        // Top Cloud Banner "Bảng tin" with Megaphone & Green Leaves
        function createGocDanChuBannerTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 900;
            canvas.height = 250;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, 900, 250);

            const drawLeaf = (x, y, rx, ry, angle, color, veinColor) => {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(-rx, 0);
                ctx.quadraticCurveTo(0, -ry * 1.25, rx, 0);
                ctx.quadraticCurveTo(0, ry * 1.25, -rx, 0);
                ctx.fill();

                ctx.strokeStyle = veinColor;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(-rx * 0.75, 0);
                ctx.lineTo(rx * 0.75, 0);
                for (let i = -2; i <= 2; i++) {
                    const vx = i * (rx * 0.22);
                    ctx.moveTo(vx, 0);
                    ctx.lineTo(vx - 12, -ry * 0.45);
                    ctx.moveTo(vx, 0);
                    ctx.lineTo(vx - 12, ry * 0.45);
                }
                ctx.stroke();
                ctx.restore();
            };

            drawLeaf(135, 95, 78, 36, 0.35, '#2e8540', '#1b5e20');
            drawLeaf(125, 168, 72, 34, -0.18, '#65b741', '#3d7a22');
            drawLeaf(765, 95, 78, 36, -0.35, '#2e8540', '#1b5e20');
            drawLeaf(775, 168, 72, 34, 0.18, '#65b741', '#3d7a22');

            const drawCloudPath = () => {
                ctx.beginPath();
                ctx.arc(245, 138, 76, Math.PI * 0.55, Math.PI * 1.48);
                ctx.arc(348, 86, 68, Math.PI * 1.05, Math.PI * 1.88);
                ctx.arc(465, 78, 66, Math.PI * 1.12, Math.PI * 1.92);
                ctx.arc(575, 88, 64, Math.PI * 1.15, Math.PI * 1.95);
                ctx.arc(665, 138, 74, Math.PI * 1.52, Math.PI * 0.48);
                ctx.arc(570, 178, 62, Math.PI * 0.08, Math.PI * 0.88);
                ctx.arc(455, 182, 66, Math.PI * 0.12, Math.PI * 0.88);
                ctx.arc(340, 178, 62, Math.PI * 0.12, Math.PI * 0.92);
                ctx.closePath();
            };

            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.22)';
            ctx.shadowBlur = 12;
            ctx.shadowOffsetY = 6;
            ctx.fillStyle = '#0f82e6';
            drawCloudPath();
            ctx.fill();
            ctx.restore();

            ctx.strokeStyle = '#0f82e6';
            ctx.lineWidth = 18;
            ctx.lineJoin = 'round';
            drawCloudPath();
            ctx.stroke();

            ctx.fillStyle = '#f8f9fa';
            drawCloudPath();
            ctx.fill();

            // Yellow & Red Megaphone Icon
            ctx.save();
            ctx.translate(260, 136);
            ctx.rotate(-0.32);

            ctx.fillStyle = '#c81e1e';
            ctx.beginPath();
            ctx.roundRect(-28, 16, 18, 42, 6);
            ctx.fill();

            ctx.fillStyle = '#c81e1e';
            ctx.beginPath();
            ctx.arc(-26, 0, 18, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.moveTo(-20, -16);
            ctx.lineTo(36, -42);
            ctx.lineTo(36, 42);
            ctx.lineTo(-20, 16);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.ellipse(36, 0, 13, 44, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#7f1d1d';
            ctx.beginPath();
            ctx.ellipse(34, 0, 6, 26, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#eab308';
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            [[-28, 56, -42, 78], [0, 60, 0, 84], [28, 56, 42, 78]].forEach(([y1, x1, y2, x2]) => {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            });
            ctx.restore();

            // Bold 3D Dark-Blue Text "Bảng tin"
            ctx.save();
            ctx.shadowColor = 'rgba(0, 20, 60, 0.28)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 4;
            ctx.fillStyle = '#072a6c';
            ctx.font = '900 92px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Bảng tin', 515, 164);
            ctx.restore();

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.anisotropy = 8;
            return tex;
        }

        // Main 3-Column Board for "Bảng tin"
        function createGocDanChuBoardTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 640;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#f3f4f6';
            ctx.beginPath();
            ctx.roundRect(4, 4, 1016, 632, 56);
            ctx.fill();

            ctx.fillStyle = '#d92638';
            ctx.beginPath();
            ctx.roundRect(20, 20, 984, 600, 44);
            ctx.fill();

            ctx.fillStyle = '#0b4fd4';
            ctx.beginPath();
            ctx.roundRect(36, 36, 952, 568, 34);
            ctx.fill();

            [[160, 28], [864, 28], [512, 612]].forEach(([sx, sy]) => {
                ctx.fillStyle = '#cbd5e1';
                ctx.beginPath();
                ctx.arc(sx, sy, 6, 0, Math.PI * 2);
                ctx.fill();
            });

            const panels = [
                { x: 56,  w: 288, bg: '#fce2ea', dashColor: '#c81e2b', title: 'Hộp thư' },
                { x: 368, w: 288, bg: '#f8f9fa', dashColor: '#0e4da4', title: 'Nội quy lớp' },
                { x: 680, w: 288, bg: '#f8f9fa', dashColor: '#c81e2b', title: 'Thi đua tổ' }
            ];

            panels.forEach((p, idx) => {
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.22)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetY = 4;
                ctx.fillStyle = p.bg;
                ctx.beginPath();
                ctx.roundRect(p.x, 58, p.w, 524, 38);
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.strokeStyle = p.dashColor;
                ctx.lineWidth = 3.5;
                ctx.setLineDash([12, 10]);
                ctx.beginPath();
                ctx.roundRect(p.x + 12, 70, p.w - 24, 500, 28);
                ctx.stroke();
                ctx.restore();

                if (idx === 0) {
                    ctx.save();
                    ctx.translate(p.x + 56, 138);
                    ctx.rotate(-0.18);
                    ctx.fillStyle = '#fff5f7';
                    ctx.strokeStyle = '#c81e2b';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.roundRect(-30, -22, 60, 44, 6);
                    ctx.fill();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(-28, -20);
                    ctx.lineTo(0, 4);
                    ctx.lineTo(28, -20);
                    ctx.stroke();
                    ctx.fillStyle = '#c81e2b';
                    ctx.beginPath();
                    ctx.arc(-5, -2, 6, 0, Math.PI * 2);
                    ctx.arc(5, -2, 6, 0, Math.PI * 2);
                    ctx.moveTo(-11, 0);
                    ctx.lineTo(0, 12);
                    ctx.lineTo(11, 0);
                    ctx.fill();
                    ctx.restore();

                    ctx.fillStyle = '#b91c1c';
                    ctx.font = '900 42px Inter, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.fillText('Hộp thư', p.x + 102, 152);
                }

                if (idx === 1) {
                    const cx = p.x + 52, cy = 136;
                    ctx.strokeStyle = '#0e4da4';
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.roundRect(cx - 26, cy - 32, 52, 66, 8);
                    ctx.stroke();
                    ctx.fillStyle = '#0e4da4';
                    ctx.beginPath();
                    ctx.roundRect(cx - 14, cy - 38, 28, 12, 4);
                    ctx.fill();
                    for (let l = 0; l < 4; l++) {
                        const ly = cy - 12 + l * 12;
                        ctx.fillRect(cx - 16, ly - 2, 6, 4);
                        ctx.fillRect(cx - 6, ly - 2, 22, 4);
                    }

                    ctx.fillStyle = '#c81e2b';
                    ctx.font = '900 35px Inter, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.fillText('Nội quy lớp', p.x + 88, 150);

                    for (let r = 0; r < 4; r++) {
                        const ry = 212 + r * 86;
                        ctx.strokeStyle = '#0e4da4';
                        ctx.lineWidth = 4.5;
                        ctx.beginPath();
                        ctx.roundRect(p.x + 36, ry, 42, 42, 8);
                        ctx.stroke();

                        ctx.strokeStyle = '#d91b26';
                        ctx.lineWidth = 7;
                        ctx.lineCap = 'round';
                        ctx.lineJoin = 'round';
                        ctx.beginPath();
                        ctx.moveTo(p.x + 45, ry + 20);
                        ctx.lineTo(p.x + 56, ry + 32);
                        ctx.lineTo(p.x + 80, ry + 4);
                        ctx.stroke();

                        ctx.strokeStyle = '#1558d6';
                        ctx.lineWidth = 4.5;
                        ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.moveTo(p.x + 98, ry + 16);
                        ctx.lineTo(p.x + 256, ry + 16);
                        ctx.moveTo(p.x + 98, ry + 34);
                        ctx.lineTo(p.x + 195, ry + 34);
                        ctx.stroke();
                    }
                }

                if (idx === 2) {
                    const tx = p.x + 56, ty = 138;
                    ctx.fillStyle = '#facc15';
                    ctx.strokeStyle = '#b91c1c';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(tx - 20, ty - 28);
                    ctx.lineTo(tx + 20, ty - 28);
                    ctx.quadraticCurveTo(tx + 18, ty + 6, tx, ty + 10);
                    ctx.quadraticCurveTo(tx - 18, ty + 6, tx - 20, ty - 28);
                    ctx.fill();
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(tx - 20, ty - 14, 9, Math.PI * 0.5, Math.PI * 1.5);
                    ctx.arc(tx + 20, ty - 14, 9, Math.PI * 1.5, Math.PI * 0.5);
                    ctx.stroke();
                    ctx.fillRect(tx - 5, ty + 10, 10, 12);
                    ctx.fillStyle = '#d97706';
                    ctx.fillRect(tx - 16, ty + 22, 32, 8);
                    ctx.fillStyle = '#15803d';
                    ctx.beginPath();
                    ctx.arc(tx, ty - 12, 6, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = '#c81e2b';
                    ctx.font = '900 38px Inter, sans-serif';
                    ctx.textAlign = 'left';
                    ctx.fillText('Thi đua tổ', p.x + 88, 150);

                    const gx = p.x + 26, gy = 198, gw = 236, gh = 342;
                    ctx.fillStyle = '#f4f4f5';
                    ctx.strokeStyle = '#c81e2b';
                    ctx.lineWidth = 3.5;
                    ctx.beginPath();
                    ctx.roundRect(gx, gy, gw, gh, 16);
                    ctx.fill();
                    ctx.stroke();

                    for (let c = 1; c < 3; c++) {
                        ctx.beginPath();
                        ctx.moveTo(gx + (gw / 3) * c, gy);
                        ctx.lineTo(gx + (gw / 3) * c, gy + gh);
                        ctx.stroke();
                    }
                    for (let r = 1; r < 4; r++) {
                        ctx.beginPath();
                        ctx.moveTo(gx, gy + (gh / 4) * r);
                        ctx.lineTo(gx + gw, gy + (gh / 4) * r);
                        ctx.stroke();
                    }
                }
            });

            const drawCornerFlower = (fx, fy, isRight) => {
                ctx.save();
                ctx.translate(fx, fy);

                ctx.fillStyle = '#388e3c';
                ctx.beginPath();
                ctx.ellipse(isRight ? 28 : -28, -36, 32, 16, isRight ? -0.6 : 0.6, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#4caf50';
                ctx.beginPath();
                ctx.ellipse(isRight ? -42 : 42, 28, 36, 18, isRight ? -0.25 : 0.25, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffda1a';
                for (let p = 0; p < 5; p++) {
                    ctx.save();
                    ctx.rotate((p * Math.PI * 2) / 5);
                    ctx.beginPath();
                    ctx.arc(0, -30, 22, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }

                ctx.fillStyle = '#7c532b';
                ctx.beginPath();
                ctx.arc(0, 0, 19, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            };

            drawCornerFlower(82, 548, false);
            drawCornerFlower(942, 548, true);

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.anisotropy = 8;
            return tex;
        }

        // Cloud sign for "Góc đọc sách" or "Góc sáng tạo"
        function createCloudSignTexture(text, type = 'creative') {
            const canvas = document.createElement('canvas');
            canvas.width = 720;
            canvas.height = 240;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, 720, 240);

            if (type === 'reading') {
                const rCx = 565, rCy = 110;
                const rainbowCols = ['#ef4444', '#f97316', '#facc15', '#4ade80', '#38bdf8', '#6366f1'];
                rainbowCols.forEach((col, i) => {
                    ctx.strokeStyle = col;
                    ctx.lineWidth = 7;
                    ctx.beginPath();
                    ctx.arc(rCx, rCy, 82 - i * 7, Math.PI * 1.05, Math.PI * 1.96);
                    ctx.stroke();
                });

                const drawReadingCloud = () => {
                    ctx.beginPath();
                    ctx.arc(135, 145, 58, Math.PI * 0.55, Math.PI * 1.45);
                    ctx.arc(215, 102, 52, Math.PI * 1.05, Math.PI * 1.88);
                    ctx.arc(315, 96, 56, Math.PI * 1.10, Math.PI * 1.90);
                    ctx.arc(415, 96, 54, Math.PI * 1.12, Math.PI * 1.92);
                    ctx.arc(510, 106, 52, Math.PI * 1.15, Math.PI * 1.90);
                    ctx.arc(595, 145, 56, Math.PI * 1.48, Math.PI * 0.48);
                    ctx.arc(505, 178, 52, Math.PI * 0.08, Math.PI * 0.90);
                    ctx.arc(405, 182, 54, Math.PI * 0.10, Math.PI * 0.90);
                    ctx.arc(305, 182, 54, Math.PI * 0.10, Math.PI * 0.90);
                    ctx.arc(205, 178, 52, Math.PI * 0.10, Math.PI * 0.92);
                    ctx.closePath();
                };

                ctx.fillStyle = '#ffffff';
                drawReadingCloud();
                ctx.fill();

                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 6;
                drawReadingCloud();
                ctx.stroke();

                ctx.save();
                ctx.translate(152, 138);
                ctx.rotate(-0.12);
                ctx.fillStyle = '#ea580c';
                ctx.beginPath();
                ctx.roundRect(-48, -32, 96, 66, 6);
                ctx.fill();
                ctx.fillStyle = '#fffbeb';
                ctx.beginPath();
                ctx.moveTo(0, -28);
                ctx.quadraticCurveTo(-24, -34, -44, -26);
                ctx.lineTo(-44, 26);
                ctx.quadraticCurveTo(-24, 20, 0, 28);
                ctx.quadraticCurveTo(24, 20, 44, 26);
                ctx.lineTo(44, -26);
                ctx.quadraticCurveTo(24, -34, 0, -28);
                ctx.fill();
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 2.5;
                for (let l = -16; l <= 14; l += 8) {
                    ctx.beginPath();
                    ctx.moveTo(-36, l); ctx.lineTo(-8, l + 2);
                    ctx.moveTo(8, l + 2); ctx.lineTo(36, l);
                    ctx.stroke();
                }
                ctx.restore();

                ctx.fillStyle = '#1e3a8a';
                ctx.font = '900 58px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('Góc đọc sách', 405, 158);
            }

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.anisotropy = 8;
            return tex;
        }

        // Pegboard texture for "Góc sáng tạo"
        function createPegboardTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 320;
            const ctx = canvas.getContext('2d');

            const grad = ctx.createLinearGradient(0, 0, 640, 320);
            grad.addColorStop(0, '#dfa868');
            grad.addColorStop(0.5, '#e6b376');
            grad.addColorStop(1, '#d89e5c');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 640, 320);

            ctx.strokeStyle = 'rgba(160, 100, 40, 0.14)';
            ctx.lineWidth = 1.5;
            for (let i = 0; i < 45; i++) {
                const y = Math.random() * 320;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(640, y + (Math.random() - 0.5) * 10);
                ctx.stroke();
            }

            for (let x = 28; x <= 612; x += 32) {
                for (let y = 28; y <= 292; y += 36) {
                    ctx.fillStyle = '#4a2c11';
                    ctx.beginPath();
                    ctx.arc(x, y, 4.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.anisotropy = 8;
            return tex;
        }

        // Fluffy Deep-Purple Shag Rug Texture for Góc đọc sách
        function createFluffyPurpleRugTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#581c4f';
            ctx.fillRect(0, 0, 512, 512);

            for (let i = 0; i < 4500; i++) {
                const cols = ['#6b215f', '#4a1542', '#79286c', '#5e1d54'];
                ctx.fillStyle = cols[i % cols.length];
                const rx = Math.random() * 512;
                const ry = Math.random() * 512;
                ctx.beginPath();
                ctx.arc(rx, ry, 1.5 + Math.random() * 3.5, 0, Math.PI * 2);
                ctx.fill();
            }
            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            return tex;
        }

        // Class 5A Sign Texture on Door & Transom
        function createClass5ASignTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 480;
            canvas.height = 180;
            const ctx = canvas.getContext('2d');

            // Crisp cobalt-blue plaque with white & gold border
            const grad = ctx.createLinearGradient(0, 0, 480, 180);
            grad.addColorStop(0, '#0068d6');
            grad.addColorStop(0.5, '#017bd2');
            grad.addColorStop(1, '#0056b3');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(4, 4, 472, 172, 18);
            ctx.fill();

            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.roundRect(12, 12, 456, 156, 12);
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(24, 24, 432, 132, 8);
            ctx.fill();

            ctx.fillStyle = '#0052ad';
            ctx.font = '900 84px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Lớp 5A', 240, 93);

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.anisotropy = 8;
            return tex;
        }

        // ============================================================================
        // FIRST-PERSON WALK & VERTICAL FLY CONTROLS:
        // DRAG MOUSE VERTICALLY TO FLY UP / LOWER DOWN, HORIZONTALLY TO ROTATE
        // ============================================================================
        let camYaw = 0;
        let camPitch = 0;
        let lastFrameTime = performance.now();
        let verticalDragFlies = true; // true: dragging mouse vertically flies up/down; false: tilts pitch
        const moveKeys = { w: false, a: false, s: false, d: false };
        const WALK_SPEED = 2.6;        // meters per second
        const LOOK_SPEED = 0.0035;     // radians per pixel dragged
        const FLY_DRAG_SPEED = 0.0095; // meters per vertical pixel dragged
        const MIN_CAM_Y = 0.20;
        const MAX_CAM_Y = 12.0;

        function toggleVerticalDragMode() {
            verticalDragFlies = !verticalDragFlies;
            const label = document.getElementById('vertical-drag-mode-text');
            const btn = document.getElementById('toggle-vertical-drag-btn');
            if (label) {
                label.textContent = verticalDragFlies ? 'Kéo dọc: Bay lên/xuống' : 'Kéo dọc: Ngước/cúi';
            }
            if (btn) {
                btn.className = verticalDragFlies
                    ? 'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/90 hover:bg-amber-400 text-slate-950 font-bold shadow-sm transition'
                    : 'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold shadow-sm transition';
            }
            showToast(
                verticalDragFlies
                    ? '🛫 Đã bật: Kéo chuột lên/xuống để bay lên cao hoặc hạ thấp góc nhìn!'
                    : '👁️ Đã bật: Kéo chuột lên/xuống để ngước/cúi (Giữ Shift hoặc Chuột phải để bay lên/xuống)!'
            );
        }

        function syncYawPitchFromCamera() {
            const e = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
            camYaw = e.y;
            camPitch = e.x;
        }

        function pointCameraAtTarget() {
            camera.lookAt(controls.target);
            syncYawPitchFromCamera();
        }

        function setupWalkControls() {
            controls = { target: CAMERA_PRESETS.corridor5A.target.clone() };
            camera.rotation.order = 'YXZ';
            pointCameraAtTarget();

            const el = renderer.domElement;
            let dragging = false;
            let dragButton = 0;
            let lastX = 0;
            let lastY = 0;

            el.addEventListener('contextmenu', (e) => e.preventDefault());

            el.addEventListener('pointerdown', (e) => {
                dragging = true;
                dragButton = e.button;
                lastX = e.clientX;
                lastY = e.clientY;
                el.setPointerCapture(e.pointerId);
                el.style.cursor = 'grabbing';
            });
            el.addEventListener('pointermove', (e) => {
                if (!dragging || cameraTween) return;
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;
                lastX = e.clientX;
                lastY = e.clientY;

                // Horizontal drag always rotates yaw smoothly
                camYaw += dx * LOOK_SPEED;

                // Vertical drag: if verticalDragFlies is active (default), left-drag flies up/down and right-drag/Shift-drag tilts pitch
                const useFly = (dragButton === 2 || e.shiftKey) ? !verticalDragFlies : verticalDragFlies;
                if (useFly) {
                    // Dragging mouse UP (dy < 0) flies UP (+Y); dragging mouse DOWN (dy > 0) lowers DOWN (-Y)
                    camera.position.y = Math.max(MIN_CAM_Y, Math.min(MAX_CAM_Y, camera.position.y - dy * FLY_DRAG_SPEED));
                        } else {
                    camPitch = Math.max(-1.45, Math.min(1.45, camPitch + dy * LOOK_SPEED));
                }
                camera.rotation.set(camPitch, camYaw, 0);
            });
            const stopDrag = () => {
                dragging = false;
                el.style.cursor = 'grab';
            };
            el.addEventListener('pointerup', stopDrag);
            el.addEventListener('pointercancel', stopDrag);

            // Mouse wheel also flies camera up or down smoothly
            el.addEventListener('wheel', (e) => {
                e.preventDefault();
                if (cameraTween) cameraTween = null;
                camera.position.y = Math.max(MIN_CAM_Y, Math.min(MAX_CAM_Y, camera.position.y - e.deltaY * 0.0022));
                }, { passive: false });

            window.addEventListener('keydown', (e) => {
                if (e.ctrlKey || e.metaKey || e.altKey) return;
                const k = e.key.toLowerCase();
                if (k in moveKeys) {
                    moveKeys[k] = true;
                    e.preventDefault();
                }
            });
            window.addEventListener('keyup', (e) => {
                const k = e.key.toLowerCase();
                if (k in moveKeys) moveKeys[k] = false;
            });
            window.addEventListener('blur', () => {
                Object.keys(moveKeys).forEach((k) => { moveKeys[k] = false; });
            });
        }

        function updateWalking(dt) {
            if (cameraTween) return;
            const forward = (moveKeys.w ? 1 : 0) - (moveKeys.s ? 1 : 0);
            const strafe = (moveKeys.d ? 1 : 0) - (moveKeys.a ? 1 : 0);
            if (!forward && !strafe) return;
            const step = (WALK_SPEED * dt) / Math.hypot(forward, strafe);
            camera.position.x += (-Math.sin(camYaw) * forward + Math.cos(camYaw) * strafe) * step;
            camera.position.z += (-Math.cos(camYaw) * forward - Math.sin(camYaw) * strafe) * step;
        }

        // ============================================================================
        // SCENE INITIALIZATION & LIGHTING
        // ============================================================================

        const KE_NUOC_UONG_IMG_SRC = 'images/ke_nuoc_uong.png';
        const TRAM_VE_SINH_IMG_SRC = 'images/tram_ve_sinh.png';

        function buildDrinkingAndHygieneStations() {
            const wallX = ROOM_W / 2; // inner face of the door-side (+X) wall
            const oakTex = createHoneyOakWoodTexture();
            const oakMat = new THREE.MeshStandardMaterial({ map: oakTex, roughness: 0.38, metalness: 0.04 });
            const oakDarkMat = new THREE.MeshStandardMaterial({ map: oakTex, color: 0xc88a42, roughness: 0.46 });
            const oakInsideMat = new THREE.MeshStandardMaterial({ map: oakTex, color: 0xb87b35, roughness: 0.52 });
            const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.94, roughness: 0.10 });
            const darkSteelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.22 });
            const ceramicWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.12, metalness: 0.05 });
            const porcelainBasinMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.10, metalness: 0.06 });
            const paperWhiteMat = new THREE.MeshStandardMaterial({ color: 0xfefefe, roughness: 0.78, metalness: 0.0 });
            const cardboardCoreMat = new THREE.MeshStandardMaterial({ color: 0xc29b61, roughness: 0.65, side: THREE.DoubleSide });
            const soilMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.88 });
            const heartLeafGeo = getRealisticHeartLeafGeometry();
            const leafLightMat = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.38, side: THREE.DoubleSide });
            const leafMidMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.40, side: THREE.DoubleSide });
            const leafDarkMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.42, side: THREE.DoubleSide });

            lowerCabinetDoors = [];

            // Helper: Build a realistic 3D Paper Towel Roll ("Khăn giấy cuộn để lau") with perforated texture, hollow cardboard core & trailing sheet
            const createPaperTowelRollHolder = (withWoodenStand = true, scale = 1.0) => {
                const rollGrp = new THREE.Group();
                rollGrp.scale.set(scale, scale, scale);

                // Subtle embossed paper towel texture
                const pCanv = document.createElement('canvas');
                pCanv.width = 256; pCanv.height = 256;
                const pCtx = pCanv.getContext('2d');
                pCtx.fillStyle = '#ffffff';
                pCtx.fillRect(0, 0, 256, 256);
                pCtx.fillStyle = '#e2e8f0';
                for (let py = 8; py < 256; py += 16) {
                    for (let px = 8; px < 256; px += 16) {
                        pCtx.beginPath();
                        pCtx.arc(px + (py % 32 === 8 ? 0 : 8), py, 1.6, 0, Math.PI * 2);
                        pCtx.fill();
                    }
                }
                pCtx.strokeStyle = '#cbd5e1';
                pCtx.lineWidth = 1.5;
                pCtx.setLineDash([4, 4]);
                pCtx.beginPath();
                pCtx.moveTo(128, 0); pCtx.lineTo(128, 256);
                pCtx.stroke();
                const pTex = new THREE.CanvasTexture(pCanv);
                pTex.encoding = THREE.sRGBEncoding;
                const quiltedPaperMat = new THREE.MeshStandardMaterial({ map: pTex, roughness: 0.72 });

                if (withWoodenStand) {
                    // Vertical Wooden Stand Holder on Countertop
                    const baseDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.072, 0.016, 24), oakDarkMat);
                    baseDisc.position.y = 0.008;
                    baseDisc.castShadow = true;
                    const centerPole = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.195, 16), oakDarkMat);
                    centerPole.position.y = 0.105;
                    const topFinial = new THREE.Mesh(new THREE.SphereGeometry(0.015, 14, 14), oakDarkMat);
                    topFinial.position.y = 0.205;
                    rollGrp.add(baseDisc, centerPole, topFinial);

                    // Paper Roll Cylinder around pole
                    const rollBody = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.145, 28, 1, true), quiltedPaperMat);
                    rollBody.position.y = 0.088;
                    rollBody.castShadow = true;
                    const rollTopCap = new THREE.Mesh(new THREE.RingGeometry(0.018, 0.052, 28), paperWhiteMat);
                    rollTopCap.rotation.x = -Math.PI / 2;
                    rollTopCap.position.y = 0.1605;
                    const rollBotCap = new THREE.Mesh(new THREE.RingGeometry(0.018, 0.052, 28), paperWhiteMat);
                    rollBotCap.rotation.x = Math.PI / 2;
                    rollBotCap.position.y = 0.0155;
                    const coreCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.146, 20, 1, true), cardboardCoreMat);
                    coreCyl.position.y = 0.088;
                    rollGrp.add(rollBody, rollTopCap, rollBotCap, coreCyl);

                    // Free-hanging loose sheet of paper towel ("tờ khăn giấy đang kéo ra")
                    const looseSheet = new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.142, 0.048), quiltedPaperMat);
                    looseSheet.position.set(0.048, 0.087, 0.022);
                    looseSheet.rotation.y = -0.35;
                    rollGrp.add(looseSheet);
                } else {
                    // Horizontal Wall/Side-Mounted Paper Towel Roll with Chrome Bracket
                    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.022, 0.068), chromeMat);
                    leftArm.position.set(-0.082, 0, -0.02);
                    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.022, 0.068), chromeMat);
                    rightArm.position.set(0.082, 0, -0.02);
                    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.175, 16), chromeMat);
                    bar.rotation.z = Math.PI / 2;
                    bar.position.set(0, 0, 0.008);
                    rollGrp.add(leftArm, rightArm, bar);

                    const hRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.14, 28, 1, true), quiltedPaperMat);
                    hRoll.rotation.z = Math.PI / 2;
                    hRoll.position.set(0, 0, 0.008);
                    hRoll.castShadow = true;
                    [-0.07, 0.07].forEach((rx) => {
                        const cap = new THREE.Mesh(new THREE.RingGeometry(0.016, 0.046, 24), paperWhiteMat);
                        cap.rotation.y = rx > 0 ? Math.PI / 2 : -Math.PI / 2;
                        cap.position.set(rx, 0, 0.008);
                        rollGrp.add(cap);
                    });
                    const hCore = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.142, 20, 1, true), cardboardCoreMat);
                    hCore.rotation.z = Math.PI / 2;
                    hCore.position.set(0, 0, 0.008);
                    const hangingSheet = new THREE.Mesh(new THREE.BoxGeometry(0.138, 0.095, 0.003), quiltedPaperMat);
                    hangingSheet.position.set(0, -0.048, 0.052);
                    hangingSheet.rotation.x = 0.08;
                    rollGrp.add(hRoll, hCore, hangingSheet);
                }
                return rollGrp;
            };

            // Helper: Build a lush, realistic Potted Pothos Plant with Ribbed Ceramic Pot, Rim, Dark Soil & Cascading Vines
            const createLushTrailingPothos = (potRadius = 0.072, potHeight = 0.105, vineCount = 10, vineDirX = -1) => {
                const plantGrp = new THREE.Group();
                const potBody = new THREE.Mesh(new THREE.CylinderGeometry(potRadius, potRadius * 0.76, potHeight, 24), ceramicWhiteMat);
                potBody.position.y = potHeight / 2;
                potBody.castShadow = true;
                potBody.receiveShadow = true;
                const potRim = new THREE.Mesh(new THREE.TorusGeometry(potRadius, 0.007, 12, 24), ceramicWhiteMat);
                potRim.rotation.x = Math.PI / 2;
                potRim.position.y = potHeight - 0.004;
                const saucer = new THREE.Mesh(new THREE.CylinderGeometry(potRadius * 0.88, potRadius * 0.82, 0.012, 24), ceramicWhiteMat);
                saucer.position.y = 0.006;
                const soilDisc = new THREE.Mesh(new THREE.CylinderGeometry(potRadius * 0.92, potRadius * 0.90, 0.014, 20), soilMat);
                soilDisc.position.y = potHeight - 0.010;
                plantGrp.add(potBody, potRim, saucer, soilDisc);

                // Lush multi-layered crown of heart-shaped pothos leaves + stems
                for (let i = 0; i < 20; i++) {
                    const ang = (i / 20) * Math.PI * 2 + (i % 2) * 0.18;
                    const dist = (0.25 + (i % 3) * 0.28) * potRadius;
                    const lMat = i % 3 === 0 ? leafLightMat : (i % 2 === 0 ? leafMidMat : leafDarkMat);
                    const lf = new THREE.Mesh(heartLeafGeo, lMat);
                    const sc = 0.65 + (i % 3) * 0.10;
                    lf.scale.set(sc, sc, sc);
                    lf.position.set(
                        Math.cos(ang) * dist,
                        potHeight + 0.018 + (i % 4) * 0.022,
                        Math.sin(ang) * dist
                    );
                    lf.rotation.set(-0.38 - (i % 3) * 0.12, ang, (i % 2 === 0 ? 0.12 : -0.12));
                    lf.castShadow = true;
                    plantGrp.add(lf);
                }

                // Trailing vines with curved green stem and alternating heart leaves
                for (let strand = 0; strand < 2; strand++) {
                    const zOff = strand === 0 ? potRadius * 0.55 : -potRadius * 0.15;
                    for (let v = 0; v < vineCount; v++) {
                        const t = v / vineCount;
                        const vx = vineDirX * (potRadius * 0.72 + t * 0.065) + Math.sin(v * 0.9 + strand) * 0.018;
                        const vy = potHeight - 0.015 - v * 0.036;
                        const vz = zOff + Math.cos(v * 0.8 + strand) * 0.016;

                        const stemSeg = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.042, 6), leafDarkMat);
                        stemSeg.position.set(vx, vy + 0.015, vz);
                        stemSeg.rotation.z = vineDirX * 0.18;
                        plantGrp.add(stemSeg);

                        const vl = new THREE.Mesh(heartLeafGeo, (v + strand) % 2 === 0 ? leafLightMat : leafMidMat);
                        const s = (0.74 - v * 0.028) * (strand === 0 ? 1.0 : 0.88);
                        vl.scale.set(s, s, s);
                        vl.position.set(vx + vineDirX * 0.012, vy, vz + 0.010);
                        vl.rotation.set(0.24, vineDirX > 0 ? 0.3 : -0.3, (v % 2 === 0 ? -0.25 : 0.25));
                        vl.castShadow = true;
                        plantGrp.add(vl);
                    }
                }
                return plantGrp;
            };

            // ====================================================================
            // 1. KỆ NƯỚC UỐNG (In front, nearer the doorway: z = -1.10)
            // ====================================================================
            const waterGroup = new THREE.Group();
            waterGroup.position.set(wallX - 0.21, 0, -1.10);
            waterGroup.rotation.y = -Math.PI / 2; // Local +Z faces into the classroom (-X)

            const cabW = 0.94, cabH = 0.68, cabD = 0.38;
            const legH = 0.045;
            const lowerBoxH = 0.355;
            const shelfBottomY = legH + lowerBoxH; // 0.40
            const shelfInteriorH = 0.255;

            // Floor contact shadow
            const waterShadow = new THREE.Mesh(
                new THREE.PlaneGeometry(cabW * 1.12, cabD * 1.25),
                new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18, depthWrite: false })
            );
            waterShadow.rotation.x = -Math.PI / 2;
            waterShadow.position.y = 0.003;
            waterGroup.add(waterShadow);

            // 4 Cylindrical Wooden Legs
            [[-cabW / 2 + 0.055, -cabD / 2 + 0.055], [cabW / 2 - 0.055, -cabD / 2 + 0.055],
             [-cabW / 2 + 0.055,  cabD / 2 - 0.055], [cabW / 2 - 0.055,  cabD / 2 - 0.055]].forEach(([lx, lz]) => {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.022, legH, 16), oakDarkMat);
                leg.position.set(lx, legH / 2, lz);
                leg.castShadow = true;
                waterGroup.add(leg);
            });

            // Hollow Lower Cabinet Box (y: 0.045 .. 0.40) so when the 2 doors swing open, the interior shelf & stored supplies are visible!
            const wWallThick = 0.020;
            const wBotSlab = new THREE.Mesh(new THREE.BoxGeometry(cabW, wWallThick, cabD), oakMat);
            wBotSlab.position.set(0, legH + wWallThick / 2, 0);
            const wMidSlab = new THREE.Mesh(new THREE.BoxGeometry(cabW, wWallThick, cabD), oakMat);
            wMidSlab.position.set(0, shelfBottomY - wWallThick / 2, 0);
            const wBackWall = new THREE.Mesh(new THREE.BoxGeometry(cabW, lowerBoxH + shelfInteriorH, wWallThick), oakDarkMat);
            wBackWall.position.set(0, legH + (lowerBoxH + shelfInteriorH) / 2, -cabD / 2 + wWallThick / 2);
            waterGroup.add(wBotSlab, wMidSlab, wBackWall);

            [-cabW / 2 + wWallThick / 2, cabW / 2 - wWallThick / 2].forEach((sx) => {
                const sideWall = new THREE.Mesh(new THREE.BoxGeometry(wWallThick, lowerBoxH + shelfInteriorH, cabD), oakMat);
                sideWall.position.set(sx, legH + (lowerBoxH + shelfInteriorH) / 2, 0);
                sideWall.castShadow = true;
                sideWall.receiveShadow = true;
                waterGroup.add(sideWall);
            });

            // Center vertical divider inside lower cabinet + interior storage shelf
            const wCenterStile = new THREE.Mesh(new THREE.BoxGeometry(0.020, lowerBoxH - 0.02, cabD - 0.03), oakInsideMat);
            wCenterStile.position.set(0, legH + lowerBoxH / 2, -0.005);
            const wInnerShelf = new THREE.Mesh(new THREE.BoxGeometry(cabW - 0.04, 0.015, cabD - 0.04), oakInsideMat);
            wInnerShelf.position.set(0, legH + lowerBoxH * 0.48, -0.01);
            waterGroup.add(wCenterStile, wInnerShelf);

            // Stored supplies inside Kệ nước uống lower cabinet (visible when doors open!):
            const spareJugMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.72, roughness: 0.14 });
            const spareJug = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.14, 20), spareJugMat);
            spareJug.position.set(-0.24, legH + 0.09, -0.02);
            const spareJugCap = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.022, 14), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
            spareJugCap.position.set(-0.24, legH + 0.168, -0.02);
            waterGroup.add(spareJug, spareJugCap);

            [0.14, 0.28].forEach((rx) => {
                const sRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.12, 20), paperWhiteMat);
                sRoll.position.set(rx, legH + 0.08, 0.0);
                const sCore = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.122, 16), cardboardCoreMat);
                sCore.position.set(rx, legH + 0.08, 0.0);
                waterGroup.add(sRoll, sCore);
            });
            for (let sc = 0; sc < 3; sc++) {
                const cupStack = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.032, 0.026, 0.085, 16),
                    new THREE.MeshStandardMaterial({ color: sc % 2 === 0 ? 0x7dd3fc : 0xfde047, roughness: 0.25 })
                );
                cupStack.position.set(-0.14 + sc * 0.13, legH + lowerBoxH * 0.48 + 0.05, 0.01);
                waterGroup.add(cupStack);
            }

            // High-res Texture Materials cropped from KE_NUOC_UONG_IMG_SRC for the 2 Hinged Lower Doors & Sign
            const keLeftDoorFaceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            const keRightDoorFaceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            const keSignFaceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.32 });
            loadEmbeddedImage(KE_NUOC_UONG_IMG_SRC, (img) => {
                keLeftDoorFaceMat.map = imageToTexture(img, 52, 742, 390, 282, 512, 370);
                keLeftDoorFaceMat.needsUpdate = true;
                keRightDoorFaceMat.map = imageToTexture(img, 444, 742, 390, 282, 512, 370);
                keRightDoorFaceMat.needsUpdate = true;
                keSignFaceMat.map = imageToTexture(img, 412, 232, 447, 255, 512, 292);
                keSignFaceMat.needsUpdate = true;
            });

            // 2 INTERACTIVE HINGED LOWER DOORS on Kệ nước uống (hinged at outer left & right edges!)
            const wDoorW = (cabW - 0.048) / 2; // 0.446m each
            const wDoorH = lowerBoxH - 0.024;  // 0.331m
            const wDoorThick = 0.018;

            [
                { side: 'left', hingeX: -cabW / 2 + 0.022, panelCenterX: wDoorW / 2, handleOffsetX: wDoorW - 0.042, openRotY: -1.92, faceMat: keLeftDoorFaceMat },
                { side: 'right', hingeX: cabW / 2 - 0.022, panelCenterX: -wDoorW / 2, handleOffsetX: -wDoorW + 0.042, openRotY: 1.92, faceMat: keRightDoorFaceMat }
            ].forEach((cfg) => {
                const doorPivot = new THREE.Group();
                doorPivot.position.set(cfg.hingeX, legH + lowerBoxH / 2, cabD / 2 - 0.004);
                doorPivot.userData = {
                    cabinetKey: 'water',
                    side: cfg.side,
                    openRotY: cfg.openRotY,
                    targetRotY: 0.0,
                    isOpen: false
                };

                const doorSlab = new THREE.Mesh(new THREE.BoxGeometry(wDoorW, wDoorH, wDoorThick), oakMat);
                doorSlab.position.set(cfg.panelCenterX, 0, wDoorThick / 2);
                doorSlab.castShadow = true;
                doorSlab.receiveShadow = true;
                doorPivot.add(doorSlab);

                // Textured front face with recessed wood-grain bevel
                const doorFrontFace = new THREE.Mesh(new THREE.PlaneGeometry(wDoorW - 0.008, wDoorH - 0.008), cfg.faceMat);
                doorFrontFace.position.set(cfg.panelCenterX, 0, wDoorThick + 0.001);
                doorPivot.add(doorFrontFace);

                // 3D Chrome Arch Handle (2 standoffs + vertical grip bar)
                const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.0065, 0.0065, 0.092, 14), chromeMat);
                handleBar.position.set(cfg.handleOffsetX, 0, wDoorThick + 0.018);
                [-0.034, 0.034].forEach((hy) => {
                    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0045, 0.018, 10), chromeMat);
                    post.rotation.x = Math.PI / 2;
                    post.position.set(cfg.handleOffsetX, hy, wDoorThick + 0.009);
                    doorPivot.add(post);
                });
                doorPivot.add(handleBar);

                waterGroup.add(doorPivot);
                lowerCabinetDoors.push(doorPivot);
            });

            // Bevelled Overhanging Wooden Countertop Slab (y: 0.655 .. 0.69)
            const topCounter = new THREE.Mesh(new THREE.BoxGeometry(cabW + 0.034, 0.035, cabD + 0.028), oakMat);
            topCounter.position.set(0, cabH - 0.005, 0.004);
            topCounter.castShadow = true;
            topCounter.receiveShadow = true;
            waterGroup.add(topCounter);

            // Realistic 3D Potted Pothos Plant Inside Left Side of Open Middle Shelf + 3D Trailing Vines Cascading Over Front Edge
            const waterShelfPlant = createLushTrailingPothos(0.068, 0.098, 9, -1);
            waterShelfPlant.position.set(-0.29, shelfBottomY, 0.05);
            waterGroup.add(waterShelfPlant);

            // 3D Sky-Blue Tray with Raised Rim + 5 Realistic Drinking Mugs ("Ca nước có quai cầm, nắp đậy và vạch chia nước")
            const trayOuterMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.26, metalness: 0.05 });
            const trayInnerMat = new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.22 });
            const trayGroup = new THREE.Group();
            trayGroup.position.set(0.11, shelfBottomY + 0.002, 0.03);
            const trayBase = new THREE.Mesh(new THREE.BoxGeometry(0.49, 0.012, 0.19), trayInnerMat);
            trayBase.position.y = 0.006;
            trayGroup.add(trayBase);
            [[-0.24, 0, 0.012, 0.028, 0.19], [0.24, 0, 0.012, 0.028, 0.19],
             [0, -0.09, 0.49, 0.028, 0.012], [0, 0.09, 0.49, 0.028, 0.012]].forEach(([tx, tz, tw, th, td]) => {
                const wall = new THREE.Mesh(new THREE.BoxGeometry(tw, th, td), trayOuterMat);
                wall.position.set(tx, th / 2, tz);
                trayGroup.add(wall);
            });
            waterGroup.add(trayGroup);

            const mugGlassMat = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.80, roughness: 0.12, metalness: 0.08 });
            const mugWaterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.55, roughness: 0.10 });
            const mugLidMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.26 });
            const mugHandleMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.22 });

            for (let b = 0; b < 5; b++) {
                const bx = -0.18 + b * 0.090;
                const mug = new THREE.Group();
                mug.position.set(bx, 0.012, 0.0);

                const body = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.030, 0.125, 22), mugGlassMat);
                body.position.y = 0.0625;
                body.castShadow = true;
                const mWater = new THREE.Mesh(new THREE.CylinderGeometry(0.029, 0.027, 0.082, 18), mugWaterMat);
                mWater.position.y = 0.044;
                const handle = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.0048, 10, 20, Math.PI), mugHandleMat);
                handle.rotation.z = -Math.PI / 2;
                handle.rotation.y = Math.PI / 6;
                handle.position.set(0.028, 0.065, 0.012);
                const lidRim = new THREE.Mesh(new THREE.CylinderGeometry(0.0345, 0.0345, 0.014, 22), mugLidMat);
                lidRim.position.y = 0.130;
                const lidKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.012, 16), mugHandleMat);
                lidKnob.position.y = 0.142;
                const badge = new THREE.Mesh(
                    new THREE.CircleGeometry(0.011, 14),
                    new THREE.MeshBasicMaterial({ color: 0xfef08a })
                );
                badge.position.set(0, 0.068, 0.0325);

                mug.add(body, mWater, handle, lidRim, lidKnob, badge);
                trayGroup.add(mug);
            }

            // 3D Upright Paper Towel Roll on Stand ("Khăn giấy cuộn để lau") on Right Side of Kệ nước uống
            const waterPaperRoll = createPaperTowelRollHolder(true, 0.82);
            waterPaperRoll.position.set(0.39, shelfBottomY + 0.002, 0.04);
            waterGroup.add(waterPaperRoll);

            // Ultra-Realistic 3D 20L Blue Water Dispenser Jug on Left of Countertop (x = -0.23, y = cabH)
            const jugGroup = new THREE.Group();
            jugGroup.position.set(-0.23, cabH, 0.01);

            const dispenserBaseMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.24, metalness: 0.08 });
            const dispenserTrimMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.30 });
            const baseBottomRing = new THREE.Mesh(new THREE.CylinderGeometry(0.156, 0.160, 0.022, 32), dispenserTrimMat);
            baseBottomRing.position.y = 0.011;
            const dispenserBase = new THREE.Mesh(new THREE.CylinderGeometry(0.134, 0.154, 0.145, 32), dispenserBaseMat);
            dispenserBase.position.y = 0.082;
            dispenserBase.castShadow = true;
            const baseTopCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.138, 0.134, 0.018, 32), dispenserTrimMat);
            baseTopCollar.position.y = 0.158;
            jugGroup.add(baseBottomRing, dispenserBase, baseTopCollar);

            // Drip Catcher Grate below the Spigot
            const dripTray = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.012, 0.048), dispenserTrimMat);
            dripTray.position.set(0, 0.008, 0.158);
            const dripGrate = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.004, 0.038), chromeMat);
            dripGrate.position.set(0, 0.015, 0.158);
            jugGroup.add(dripTray, dripGrate);

            // Detailed 3D White & Blue Spigot / Push-Lever Water Tap on Front of Dispenser Base
            const tapShield = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.010, 20), ceramicWhiteMat);
            tapShield.rotation.x = Math.PI / 2;
            tapShield.position.set(0, 0.092, 0.144);
            const tapBody = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.052, 16), ceramicWhiteMat);
            tapBody.rotation.x = Math.PI / 2;
            tapBody.position.set(0, 0.092, 0.162);
            const tapNozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.0085, 0.007, 0.034, 14), ceramicWhiteMat);
            tapNozzle.position.set(0, 0.074, 0.178);
            const tapCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.010, 16), new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.25 }));
            tapCollar.position.set(0, 0.104, 0.174);
            const tapLever = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.007, 0.030), ceramicWhiteMat);
            tapLever.position.set(0, 0.114, 0.180);
            tapLever.rotation.x = -0.15;
            jugGroup.add(tapShield, tapBody, tapNozzle, tapCollar, tapLever);

            // Inverted 20L Clear-Blue Polycarbonate Water Bottle with Neck, Shoulder Dome, 3 Structural Ribs, Internal Water Meniscus & Top Handle
            const jugGlassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.48, roughness: 0.08, metalness: 0.14 });
            const jugRibMat = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.68, roughness: 0.10, metalness: 0.12 });
            const jugWaterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.74, roughness: 0.08, metalness: 0.05 });
            const waterSurfaceMat = new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.85, roughness: 0.05 });

            const jugLowerShoulder = new THREE.Mesh(new THREE.CylinderGeometry(0.142, 0.095, 0.042, 32), jugGlassMat);
            jugLowerShoulder.position.y = 0.182;
            const jugBody = new THREE.Mesh(new THREE.CylinderGeometry(0.142, 0.142, 0.295, 32), jugGlassMat);
            jugBody.position.y = 0.350;
            jugBody.castShadow = true;
            const jugTopDome = new THREE.Mesh(new THREE.SphereGeometry(0.142, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.48), jugGlassMat);
            jugTopDome.scale.set(1, 0.36, 1);
            jugTopDome.position.y = 0.495;
            const jugTopCap = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.054, 0.018, 24), dispenserBaseMat);
            jugTopCap.position.y = 0.548;
            jugGroup.add(jugLowerShoulder, jugBody, jugTopDome, jugTopCap);

            const innerWater = new THREE.Mesh(new THREE.CylinderGeometry(0.134, 0.134, 0.245, 28), jugWaterMat);
            innerWater.position.y = 0.325;
            const waterMeniscus = new THREE.Mesh(new THREE.CircleGeometry(0.134, 28), waterSurfaceMat);
            waterMeniscus.rotation.x = -Math.PI / 2;
            waterMeniscus.position.y = 0.448;
            jugGroup.add(innerWater, waterMeniscus);

            [[0.03, 0.24, 0.09, 0.008], [-0.04, 0.31, 0.10, 0.006], [0.02, 0.38, 0.08, 0.010], [-0.02, 0.42, 0.09, 0.005]].forEach(([bx, by, bz, br]) => {
                const bubble = new THREE.Mesh(new THREE.SphereGeometry(br, 10, 10), waterSurfaceMat);
                bubble.position.set(bx, by, bz);
                jugGroup.add(bubble);
            });

            [0.245, 0.345, 0.445].forEach((ry) => {
                const rib = new THREE.Mesh(new THREE.TorusGeometry(0.143, 0.009, 12, 32), jugRibMat);
                rib.rotation.x = Math.PI / 2;
                rib.position.y = ry;
                jugGroup.add(rib);
            });

            // 5-Petal Yellow Flower Emblem on Front of Jug (facing +Z, properly oriented!)
            const jugFlower = new THREE.Group();
            jugFlower.position.set(0, 0.295, 0.146);
            const petalYellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.30 });
            const centerOrangeMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.28 });
            const whiteRimMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const backSticker = new THREE.Mesh(new THREE.CircleGeometry(0.038, 24), whiteRimMat);
            jugFlower.add(backSticker);
            for (let p = 0; p < 5; p++) {
                const a = (p / 5) * Math.PI * 2 - Math.PI / 2;
                const pet = new THREE.Mesh(new THREE.SphereGeometry(0.013, 12, 12), petalYellowMat);
                pet.scale.set(1.0, 1.25, 0.35);
                pet.position.set(Math.cos(a) * 0.019, Math.sin(a) * 0.019, 0.003);
                pet.rotation.z = a + Math.PI / 2;
                jugFlower.add(pet);
            }
            const flCenter = new THREE.Mesh(new THREE.SphereGeometry(0.011, 14, 14), centerOrangeMat);
            flCenter.scale.set(1, 1, 0.45);
            flCenter.position.z = 0.005;
            jugFlower.add(flCenter);
            jugGroup.add(jugFlower);

            waterGroup.add(jugGroup);

            // 3D Framed "Kệ nước uống" Sign Standing on Right Side of Countertop (x = 0.18, y = cabH)
            const keSignGroup = new THREE.Group();
            keSignGroup.position.set(0.18, cabH, -0.02);
            [-0.12, 0.12].forEach((px) => {
                const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.032, 12), oakDarkMat);
                peg.position.set(px, 0.016, 0);
                keSignGroup.add(peg);
            });
            const keSignFrame = new THREE.Mesh(
                new THREE.BoxGeometry(0.46, 0.265, 0.028),
                new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.35 })
            );
            keSignFrame.position.y = 0.16;
            keSignFrame.castShadow = true;
            const keSignFace = new THREE.Mesh(new THREE.PlaneGeometry(0.445, 0.25), keSignFaceMat);
            keSignFace.position.set(0, 0.16, 0.015);
            keSignGroup.add(keSignFrame, keSignFace);
            waterGroup.add(keSignGroup);

            scene.add(waterGroup);

            // ====================================================================
            // 2. TRẠM VỆ SINH CÁ NHÂN (Placed behind Kệ nước uống: z = +0.04)
            // ====================================================================
            const hygieneGroup = new THREE.Group();
            hygieneGroup.position.set(wallX - 0.21, 0, 0.04);
            hygieneGroup.rotation.y = -Math.PI / 2; // Local +Z faces into the classroom (-X)

            const vanW = 0.80, vanH = 0.66, vanD = 0.38;
            const vanBodyH = vanH - legH; // 0.615

            const hygieneShadow = new THREE.Mesh(
                new THREE.PlaneGeometry(vanW * 1.14, vanD * 1.28),
                new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18, depthWrite: false })
            );
            hygieneShadow.rotation.x = -Math.PI / 2;
            hygieneShadow.position.y = 0.003;
            hygieneGroup.add(hygieneShadow);

            // 4 Wooden Vanity Legs
            [[-vanW / 2 + 0.05, -vanD / 2 + 0.05], [vanW / 2 - 0.05, -vanD / 2 + 0.05],
             [-vanW / 2 + 0.05,  vanD / 2 - 0.05], [vanW / 2 - 0.05,  vanD / 2 - 0.05]].forEach(([lx, lz]) => {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.022, legH, 14), oakDarkMat);
                leg.position.set(lx, legH / 2, lz);
                leg.castShadow = true;
                hygieneGroup.add(leg);
            });

            // Hollow 3D Honey-Oak Vanity Cabinet Structure (y: 0.045 .. 0.66)
            const vWallThick = 0.020;
            const vBotSlab = new THREE.Mesh(new THREE.BoxGeometry(vanW, vWallThick, vanD), oakMat);
            vBotSlab.position.set(0, legH + vWallThick / 2, 0);
            const vBackWall = new THREE.Mesh(new THREE.BoxGeometry(vanW, vanBodyH, vWallThick), oakDarkMat);
            vBackWall.position.set(0, legH + vanBodyH / 2, -vanD / 2 + vWallThick / 2);
            hygieneGroup.add(vBotSlab, vBackWall);

            [-vanW / 2 + vWallThick / 2, vanW / 2 - vWallThick / 2].forEach((sx) => {
                const sWall = new THREE.Mesh(new THREE.BoxGeometry(vWallThick, vanBodyH, vanD), oakMat);
                sWall.position.set(sx, legH + vanBodyH / 2, 0);
                sWall.castShadow = true;
                sWall.receiveShadow = true;
                hygieneGroup.add(sWall);
            });

            // Vertical divider between left towel cubby column (x = -0.21) and right double-door compartment
            const vColDivider = new THREE.Mesh(new THREE.BoxGeometry(0.020, vanBodyH, vanD - 0.01), oakMat);
            vColDivider.position.set(-0.21, legH + vanBodyH / 2, -0.002);
            hygieneGroup.add(vColDivider);

            // Left column lower panel (y: 0.055 .. 0.43) + towel cubby shelf (y = 0.435)
            const leftLowerBox = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.375, vanD - 0.01), oakMat);
            leftLowerBox.position.set(-0.305, legH + 0.19, 0);
            const towelShelfSlab = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.020, vanD), oakMat);
            towelShelfSlab.position.set(-0.30, 0.435, 0);
            hygieneGroup.add(leftLowerBox, towelShelfSlab);

            // Right compartment top apron rail (under the sink belly, y: 0.565 .. 0.65)
            const rightApron = new THREE.Mesh(new THREE.BoxGeometry(0.59, 0.085, vanD - 0.01), oakMat);
            rightApron.position.set(0.095, 0.605, 0);
            const vInnerShelf = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.015, vanD - 0.04), oakInsideMat);
            vInnerShelf.position.set(0.095, legH + 0.24, -0.01);
            hygieneGroup.add(rightApron, vInnerShelf);

            // Chrome Drain Pipe (Siphon / P-trap) + Stored Refill Bottles & Extra Paper Towel Rolls inside Trạm vệ sinh lower cabinet
            const drainPipeV = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.24, 16), chromeMat);
            drainPipeV.position.set(0.03, 0.48, -0.02);
            const drainTrap = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.016, 12, 20, Math.PI), chromeMat);
            drainTrap.rotation.z = Math.PI;
            drainTrap.position.set(0.058, 0.36, -0.02);
            const drainWallPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.14, 14), chromeMat);
            drainWallPipe.rotation.x = Math.PI / 2;
            drainWallPipe.position.set(0.086, 0.38, -0.09);
            hygieneGroup.add(drainPipeV, drainTrap, drainWallPipe);

            [[-0.08, 0xfacc15], [0.02, 0x38bdf8]].forEach(([bx, col]) => {
                const refill = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.038, 0.038, 0.14, 18),
                    new THREE.MeshStandardMaterial({ color: col, roughness: 0.24 })
                );
                refill.position.set(bx, legH + 0.085, 0.02);
                hygieneGroup.add(refill);
            });
            [0.16, 0.27].forEach((rx) => {
                const sRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.040, 0.040, 0.115, 20), paperWhiteMat);
                sRoll.position.set(rx, legH + 0.075, 0.02);
                const sCore = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.117, 16), cardboardCoreMat);
                sCore.position.set(rx, legH + 0.075, 0.02);
                hygieneGroup.add(sRoll, sCore);
            });

            // High-res Texture Materials cropped from TRAM_VE_SINH_IMG_SRC for Left Panel, 2 Hinged Doors & Top Sign
            const tvsLeftPanelMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            const tvsDoorLeftMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            const tvsDoorRightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            const tvsSignFaceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.32 });
            loadEmbeddedImage(TRAM_VE_SINH_IMG_SRC, (img) => {
                tvsLeftPanelMat.map = imageToTexture(img, 88, 920, 108, 226, 160, 330);
                tvsLeftPanelMat.needsUpdate = true;
                tvsDoorLeftMat.map = imageToTexture(img, 198, 792, 202, 355, 320, 560);
                tvsDoorLeftMat.needsUpdate = true;
                tvsDoorRightMat.map = imageToTexture(img, 402, 792, 202, 355, 320, 560);
                tvsDoorRightMat.needsUpdate = true;
                tvsSignFaceMat.map = imageToTexture(img, 102, 5, 534, 415, 600, 468);
                tvsSignFaceMat.needsUpdate = true;
            });

            const leftLowerFace = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.35), tvsLeftPanelMat);
            leftLowerFace.position.set(-0.305, legH + 0.19, vanD / 2 + 0.002);
            hygieneGroup.add(leftLowerFace);

            // 2 INTERACTIVE HINGED LOWER DOORS on Trạm vệ sinh cá nhân (spanning x: -0.20 .. +0.38, y: 0.055 .. 0.560)
            const vDoorW = 0.286;
            const vDoorH = 0.495;
            const vDoorThick = 0.018;
            const vDoorCenterY = legH + 0.012 + vDoorH / 2;

            [
                { side: 'left', hingeX: -0.20 + 0.004, panelCenterX: vDoorW / 2, handleOffsetX: vDoorW - 0.036, openRotY: -1.92, faceMat: tvsDoorLeftMat },
                { side: 'right', hingeX: 0.38 - 0.004, panelCenterX: -vDoorW / 2, handleOffsetX: -vDoorW + 0.036, openRotY: 1.92, faceMat: tvsDoorRightMat }
            ].forEach((cfg) => {
                const doorPivot = new THREE.Group();
                doorPivot.position.set(cfg.hingeX, vDoorCenterY, vanD / 2 - 0.004);
                doorPivot.userData = {
                    cabinetKey: 'hygiene',
                    side: cfg.side,
                    openRotY: cfg.openRotY,
                    targetRotY: 0.0,
                    isOpen: false
                };

                const doorSlab = new THREE.Mesh(new THREE.BoxGeometry(vDoorW, vDoorH, vDoorThick), oakMat);
                doorSlab.position.set(cfg.panelCenterX, 0, vDoorThick / 2);
                doorSlab.castShadow = true;
                doorSlab.receiveShadow = true;
                doorPivot.add(doorSlab);

                const doorFrontFace = new THREE.Mesh(new THREE.PlaneGeometry(vDoorW - 0.006, vDoorH - 0.006), cfg.faceMat);
                doorFrontFace.position.set(cfg.panelCenterX, 0, vDoorThick + 0.001);
                doorPivot.add(doorFrontFace);

                // Single 3D Chrome Handle attached directly to the hinged door
                const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.0065, 0.0065, 0.092, 14), chromeMat);
                handleBar.position.set(cfg.handleOffsetX, -0.02, vDoorThick + 0.018);
                [-0.034, 0.034].forEach((hy) => {
                    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0045, 0.018, 10), chromeMat);
                    post.rotation.x = Math.PI / 2;
                    post.position.set(cfg.handleOffsetX, -0.02 + hy, vDoorThick + 0.009);
                    doorPivot.add(post);
                });
                doorPivot.add(handleBar);

                hygieneGroup.add(doorPivot);
                lowerCabinetDoors.push(doorPivot);
            });

            // Overhanging Wooden Vanity Countertop (y: 0.66)
            const vanCounter = new THREE.Mesh(new THREE.BoxGeometry(vanW + 0.04, 0.032, vanD + 0.028), oakMat);
            vanCounter.position.set(0, vanH, 0.004);
            vanCounter.castShadow = true;
            vanCounter.receiveShadow = true;
            hygieneGroup.add(vanCounter);

            // 3 Plush Folded Sky-Blue Hand Towels with Rounded Folded Edges in the Upper-Left Open Cubby
            const towelCols = [0x38bdf8, 0x7dd3fc, 0x38bdf8];
            [0.462, 0.500, 0.538].forEach((ty, idx) => {
                const tMat = new THREE.MeshStandardMaterial({ color: towelCols[idx], roughness: 0.68 });
                const tGrp = new THREE.Group();
                tGrp.position.set(-0.30, ty, vanD / 2 - 0.085);
                const tSlab = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.030, 0.16), tMat);
                const tFrontRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.145, 16), tMat);
                tFrontRoll.rotation.z = Math.PI / 2;
                tFrontRoll.position.set(0, 0, 0.08);
                tGrp.add(tSlab, tFrontRoll);
                hygieneGroup.add(tGrp);
            });

            // 3D Sculpted Glazed White Porcelain Washbasin ("Bồn rửa tay sứ trắng lòng sâu bo tròn")
            const sinkGroup = new THREE.Group();
            sinkGroup.position.set(0.05, vanH + 0.016, 0.02);
            const sW = 0.62, sH = 0.135, sD = 0.34;

            const underBelly = new THREE.Mesh(new THREE.BoxGeometry(sW - 0.02, 0.048, sD - 0.02), porcelainBasinMat);
            underBelly.position.set(0, -0.026, 0.008);
            const underLip = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, sW - 0.03, 18), porcelainBasinMat);
            underLip.rotation.z = Math.PI / 2;
            underLip.position.set(0, -0.036, sD / 2 - 0.025);
            sinkGroup.add(underBelly, underLip);

            const sinkBot = new THREE.Mesh(new THREE.BoxGeometry(sW, 0.028, sD), porcelainBasinMat);
            sinkBot.position.y = 0.014;
            const sinkFrontWall = new THREE.Mesh(new THREE.BoxGeometry(sW, sH, 0.044), porcelainBasinMat);
            sinkFrontWall.position.set(0, sH / 2, sD / 2 - 0.022);
            sinkFrontWall.castShadow = true;
            const sinkBackDeck = new THREE.Mesh(new THREE.BoxGeometry(sW, sH, 0.098), porcelainBasinMat);
            sinkBackDeck.position.set(0, sH / 2, -sD / 2 + 0.049);
            const sinkLeftWall = new THREE.Mesh(new THREE.BoxGeometry(0.052, sH, sD - 0.142), porcelainBasinMat);
            sinkLeftWall.position.set(-sW / 2 + 0.026, sH / 2, -0.0275);
            const sinkRightWall = new THREE.Mesh(new THREE.BoxGeometry(0.052, sH, sD - 0.142), porcelainBasinMat);
            sinkRightWall.position.set(sW / 2 - 0.026, sH / 2, -0.0275);
            sinkGroup.add(sinkBot, sinkFrontWall, sinkBackDeck, sinkLeftWall, sinkRightWall);

            // Smooth Rounded Porcelain Bullnose Top Rim around the front & sides of the washbasin
            const frontRimCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, sW, 20), ceramicWhiteMat);
            frontRimCyl.rotation.z = Math.PI / 2;
            frontRimCyl.position.set(0, sH, sD / 2 - 0.022);
            [-sW / 2 + 0.026, sW / 2 - 0.026].forEach((rx) => {
                const sideRimCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, sD - 0.02, 20), ceramicWhiteMat);
                sideRimCyl.rotation.x = Math.PI / 2;
                sideRimCyl.position.set(rx, sH, 0);
                sinkGroup.add(sideRimCyl);
            });
            sinkGroup.add(frontRimCyl);

            const innerWaterPool = new THREE.Mesh(
                new THREE.PlaneGeometry(sW - 0.11, sD - 0.15),
                new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.38, roughness: 0.06, metalness: 0.15 })
            );
            innerWaterPool.rotation.x = -Math.PI / 2;
            innerWaterPool.position.set(0, 0.032, 0.025);
            sinkGroup.add(innerWaterPool);

            // Stainless Steel Strainer Drain & Chrome Overflow Ring inside the Basin
            const drainOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.006, 24), chromeMat);
            drainOuter.position.set(0, 0.031, 0.022);
            const drainInner = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.007, 20), darkSteelMat);
            drainInner.position.set(0, 0.0315, 0.022);
            const overflowRing = new THREE.Mesh(new THREE.RingGeometry(0.011, 0.018, 20), chromeMat);
            overflowRing.position.set(0, sH * 0.64, -sD / 2 + 0.099);
            const overflowHole = new THREE.Mesh(new THREE.CircleGeometry(0.011, 20), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
            overflowHole.position.set(0, sH * 0.64, -sD / 2 + 0.100);
            sinkGroup.add(drainOuter, drainInner, overflowRing, overflowHole);

            // Realistic 3D Polished Chrome Mixer Faucet with Escutcheon Ring, Aerator & Water Droplet
            const faucetGroup = new THREE.Group();
            faucetGroup.position.set(0, sH + 0.004, -sD / 2 + 0.052);
            const fBaseRing = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.030, 0.010, 24), chromeMat);
            fBaseRing.position.y = 0.005;
            const fPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 0.105, 24), chromeMat);
            fPillar.position.y = 0.056;
            fPillar.castShadow = true;
            const fCap = new THREE.Mesh(new THREE.CylinderGeometry(0.023, 0.023, 0.016, 24), chromeMat);
            fCap.position.y = 0.112;
            const fLever = new THREE.Mesh(new THREE.BoxGeometry(0.020, 0.008, 0.068), chromeMat);
            fLever.rotation.x = -0.16;
            fLever.position.set(0, 0.122, 0.020);
            const fSpout = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.014, 0.095, 20), chromeMat);
            fSpout.rotation.x = Math.PI / 2 + 0.24;
            fSpout.position.set(0, 0.074, 0.044);
            const fAerator = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.011, 0.014, 18), chromeMat);
            fAerator.position.set(0, 0.056, 0.082);
            const waterDrop = new THREE.Mesh(
                new THREE.SphereGeometry(0.006, 12, 12),
                new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85, roughness: 0.05 })
            );
            waterDrop.scale.set(0.85, 1.35, 0.85);
            waterDrop.position.set(0, 0.042, 0.082);
            faucetGroup.add(fBaseRing, fPillar, fCap, fLever, fSpout, fAerator, waterDrop);
            sinkGroup.add(faucetGroup);

            // 3 Realistic 3D Pump Dispenser Bottles on Sink Back Deck with Front Icon Labels (Drop, Cross, Leaf) & Liquid Level
            const makeDetailedPumpBottle = (bx, bodyHex, liquidHex, pumpHex, labelType) => {
                const bg = new THREE.Group();
                bg.position.set(bx, sH + 0.004, -sD / 2 + 0.050);

                const shellMat = new THREE.MeshStandardMaterial({
                    color: bodyHex,
                    transparent: labelType !== 'leaf',
                    opacity: labelType !== 'leaf' ? 0.55 : 1.0,
                    roughness: 0.14,
                    metalness: 0.06
                });
                const liqMat = new THREE.MeshStandardMaterial({
                    color: liquidHex,
                    transparent: true,
                    opacity: 0.88,
                    roughness: 0.18
                });
                const pMat = new THREE.MeshStandardMaterial({ color: pumpHex, roughness: 0.24 });

                const bBody = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.092, 22), shellMat);
                bBody.position.y = 0.046;
                bBody.castShadow = true;
                const bShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.035, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), shellMat);
                bShoulder.scale.set(1, 0.38, 1);
                bShoulder.position.y = 0.092;
                bg.add(bBody, bShoulder);

                if (labelType !== 'leaf') {
                    const innerLiq = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.072, 18), liqMat);
                    innerLiq.position.y = 0.038;
                    const dipTube = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.095, 8), paperWhiteMat);
                    dipTube.position.y = 0.050;
                    bg.add(innerLiq, dipTube);
                }

                const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.015, 0.018, 16), pMat);
                collar.position.y = 0.112;
                const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.018, 12), pMat);
                neck.position.y = 0.126;
                const head = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.010, 0.044), pMat);
                head.position.set(0, 0.135, 0.012);
                head.rotation.x = 0.08;
                bg.add(collar, neck, head);

                const lCanv = document.createElement('canvas');
                lCanv.width = 128; lCanv.height = 128;
                const lCtx = lCanv.getContext('2d');
                lCtx.clearRect(0, 0, 128, 128);
                if (labelType === 'drop') {
                    lCtx.fillStyle = '#ffffff';
                    lCtx.beginPath();
                    lCtx.moveTo(64, 24);
                    lCtx.bezierCurveTo(92, 62, 94, 98, 64, 102);
                    lCtx.bezierCurveTo(34, 98, 36, 62, 64, 24);
                    lCtx.fill();
                } else if (labelType === 'cross') {
                    lCtx.fillStyle = '#ffffff';
                    lCtx.fillRect(50, 30, 28, 68);
                    lCtx.fillRect(30, 50, 68, 28);
                } else {
                    lCtx.fillStyle = '#10b981';
                    lCtx.beginPath();
                    lCtx.ellipse(52, 68, 14, 26, -0.45, 0, Math.PI * 2);
                    lCtx.ellipse(76, 72, 12, 22, 0.45, 0, Math.PI * 2);
                    lCtx.fill();
                }
                const lTex = new THREE.CanvasTexture(lCanv);
                lTex.encoding = THREE.sRGBEncoding;
                const labelMesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(0.036, 0.036),
                    new THREE.MeshBasicMaterial({ map: lTex, transparent: true, depthWrite: false })
                );
                labelMesh.position.set(0, 0.048, 0.036);
                bg.add(labelMesh);

                return bg;
            };

            const yellowSoap = makeDetailedPumpBottle(-0.145, 0xfef08a, 0xfacc15, 0xffffff, 'drop');
            const blueSanitizer = makeDetailedPumpBottle(0.130, 0x7dd3fc, 0x0ea5e9, 0xffffff, 'cross');
            const whiteLotion = makeDetailedPumpBottle(0.222, 0xffffff, 0xffffff, 0x0284c7, 'leaf');
            sinkGroup.add(yellowSoap, blueSanitizer, whiteLotion);

            hygieneGroup.add(sinkGroup);

            // Side-Mounted Horizontal Paper Towel Roll Holder ("Khăn giấy cuộn để lau tay") on the Right Side of Trạm vệ sinh
            const hygienePaperRoll = createPaperTowelRollHolder(false, 0.85);
            hygienePaperRoll.rotation.y = Math.PI / 2;
            hygienePaperRoll.position.set(vanW / 2 + 0.038, vanH - 0.08, 0.04);
            hygieneGroup.add(hygienePaperRoll);

            // Left Raised Wooden Shelf Ledge + Realistic 3D Potted Trailing Pothos Plant
            const leftLedge = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.16, 0.26), oakMat);
            leftLedge.position.set(-0.335, vanH + 0.08, -0.02);
            hygieneGroup.add(leftLedge);

            const tvsPlant = createLushTrailingPothos(0.068, 0.098, 10, -1);
            tvsPlant.position.set(-0.335, vanH + 0.16, -0.01);
            hygieneGroup.add(tvsPlant);

            // Upper 3D Wooden Backboard + 3D Sky-Blue Framed "Trạm vệ sinh cá nhân" Sign Flush Above the Faucet & Bottles
            const backBoard = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.78, 0.026), oakMat);
            backBoard.position.set(0.03, vanH + 0.40, -vanD / 2 + 0.015);
            hygieneGroup.add(backBoard);

            const splashback = new THREE.Mesh(
                new THREE.PlaneGeometry(0.62, 0.24),
                new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.25 })
            );
            splashback.position.set(0.03, vanH + 0.20, -vanD / 2 + 0.029);
            hygieneGroup.add(splashback);

            const tvsSignFrame = new THREE.Mesh(
                new THREE.BoxGeometry(0.64, 0.50, 0.030),
                new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.32 })
            );
            tvsSignFrame.position.set(0.03, 1.24, -vanD / 2 + 0.034);
            tvsSignFrame.castShadow = true;
            const tvsSignFace = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.48), tvsSignFaceMat);
            tvsSignFace.position.set(0.03, 1.24, -vanD / 2 + 0.050);
            hygieneGroup.add(tvsSignFrame, tvsSignFace);

            scene.add(hygieneGroup);
        }

        function initScene() {
            const container = document.getElementById('canvas-container');

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x9bd3f5);

            camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.08, 180);
            camera.position.copy(CAMERA_PRESETS.corridor5A.pos);

            renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.78;
            container.appendChild(renderer.domElement);

            setupWalkControls();

            setupLighting();
            buildOutdoorSkyAndSchoolBlock();
            buildClassroomArchitecture();
            buildFrontWallAndPodiumDetails();
            buildGocDanChuAndGocSangTao();
            buildLeftWallWindowAndGocDocSach();
            buildDrinkingAndHygieneStations();
            buildRightWallDoor5A();
            buildStudentDesksAndChairs();
            applyEmbeddedImages();
            createHotspotsUI();
            updateBoardStateLabel();

            window.addEventListener('resize', onWindowResize);
            renderer.domElement.addEventListener('pointerdown', onCanvasPointerDown);
            renderer.domElement.addEventListener('pointerup', onCanvasPointerUp);
            animate();
        }

        // Interactive Raycaster Click on Teacher Swivel Office Chair
        function onCanvasPointerDown(e) {
            pointerDownPos.set(e.clientX, e.clientY);
        }

        function onCanvasPointerUp(e) {
            pointerUpPos.set(e.clientX, e.clientY);
            if (pointerDownPos.distanceTo(pointerUpPos) > 6) return; // Ignore drag gestures

            const rect = renderer.domElement.getBoundingClientRect();
            const mouse = new THREE.Vector2(
                ((e.clientX - rect.left) / rect.width) * 2 - 1,
                -((e.clientY - rect.top) / rect.height) * 2 + 1
            );

            raycaster.setFromCamera(mouse, camera);
            const hits = raycaster.intersectObjects(scene.children, true);
            if (!hits.length) return;

            const first = hits[0].object;
            if (boardWings.includes(first)) {
                toggleBoardWing(first);
                return;
            }
            let node = first;
            while (node) {
                if (node === firstAidCabinetGroup) {
                    toggleFirstAidBox();
                    return;
                }
                if (lowerCabinetDoors.includes(node)) {
                    toggleSingleLowerCabinetDoor(node);
                    return;
                }
                if (node === wallLightSwitchGroup) {
                    toggleLights();
                    showToast(lightsOn ? '💡 Đã bật công tắc Đèn lớp học!' : '💡 Đã tắt công tắc Đèn lớp học!');
                    return;
                }
                if (node === wallFanSwitchGroup) {
                    toggleFans();
                    showToast(fansSpinning ? '🌀 Đã bật công tắc Quạt trần!' : '🌀 Đã tắt công tắc Quạt trần!');
                    return;
                }
                if (classroomDoors.includes(node)) {
                    toggleSingleClassroomDoor(node);
                    return;
                }
                if (node === teacherChairSwivelGroup) {
                    spinTeacherChairAction();
                    return;
                }
                node = node.parent;
            }
        }

        function setupLighting() {
            // Soft, balanced warm-neutral ambient light (glare-free)
            const ambient = new THREE.AmbientLight(0xfffcf5, 0.54);
            scene.add(ambient);

            const hemi = new THREE.HemisphereLight(0xe0f2fe, 0xede6d6, 0.26);
            hemi.position.set(0, 22, 0);
            scene.add(hemi);

            const sunLight = new THREE.DirectionalLight(0xfffbf0, 0.52);
            sunLight.position.set(-18, 15, -2);
            sunLight.castShadow = true;
            sunLight.shadow.mapSize.width = 2048;
            sunLight.shadow.mapSize.height = 2048;
            sunLight.shadow.camera.near = 1;
            sunLight.shadow.camera.far = 45;
            const d = 14;
            sunLight.shadow.camera.left = -d;
            sunLight.shadow.camera.right = d;
            sunLight.shadow.camera.top = d;
            sunLight.shadow.camera.bottom = -d;
            sunLight.shadow.bias = -0.0005;
            scene.add(sunLight);

            const positions = [
                [-2.7, 3.3, -0.5],
                [0.0, 3.3, -0.5],
                [2.7, 3.3, -0.5]
            ];
            positions.forEach(([x, y, z]) => {
                const pl = new THREE.PointLight(0xfffdf8, 0.18, 12);
                pl.position.set(x, y, z);
                scene.add(pl);
                roomTubeLights.push(pl);
            });
        }

        function updateExposure(val) {
            const num = parseFloat(val);
            if (renderer) {
                renderer.toneMappingExposure = num;
            }
            const label = document.getElementById('exposure-val');
            if (label) {
                label.textContent = `${Math.round(num * 100)}%`;
            }
        }

        // ============================================================================
        // EXTERIOR SKY DOME & TWO-CLASSROOM SCHOOL BLOCK (LIKE REFERENCE VIDEO)
        // ============================================================================
        function buildOutdoorSkyAndSchoolBlock() {
            // 360° Daylight Sky Sphere
            const skyDome = new THREE.Mesh(
                new THREE.SphereGeometry(75, 32, 24),
                new THREE.MeshBasicMaterial({
                    map: createBrightSkyDomeTexture(),
                    side: THREE.BackSide
                })
            );
            scene.add(skyDome);

            // Exterior schoolyard trees visible through left window
            [-9.5, -12.0, -8.8].forEach((tx, idx) => {
                const tree = new THREE.Group();
                tree.position.set(tx, -0.2, -3.5 + idx * 2.8);
                const trunk = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.18, 0.26, 2.6, 10),
                    new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.9 })
                );
                trunk.position.y = 1.3;
                tree.add(trunk);

                const foliageMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.75 });
                [[-0.4, 2.8, 0], [0.4, 2.9, 0.3], [0, 3.3, -0.2]].forEach(([fx, fy, fz]) => {
                    const crown = new THREE.Mesh(new THREE.SphereGeometry(1.15, 14, 14), foliageMat);
                    crown.position.set(fx, fy, fz);
                    tree.add(crown);
                });
                scene.add(tree);
            });

            // Wide sunlit school hallway / veranda in front of Classroom 5A (+X side)
            const corridorW = 5.4;
            const corridorLen = ROOM_D + 5.0;
            const corridorTileTex = createFloorTileTexture();
            const corridorFloor = new THREE.Mesh(
                new THREE.BoxGeometry(corridorW, 0.16, corridorLen),
                new THREE.MeshStandardMaterial({ map: corridorTileTex, color: 0xf5e6d3, roughness: 0.65 })
            );
            corridorFloor.position.set(ROOM_W / 2 + corridorW / 2, -0.08, 0);
            corridorFloor.receiveShadow = true;
            scene.add(corridorFloor);

            // White Corridor Ceiling with Recessed Beams & 2 Ceiling Tube Lights
            const corrCeilingMat = new THREE.MeshStandardMaterial({ color: 0xfbf9f5, roughness: 0.85 });
            const corrCeiling = new THREE.Mesh(
                new THREE.BoxGeometry(corridorW, 0.14, corridorLen),
                corrCeilingMat
            );
            corrCeiling.position.set(ROOM_W / 2 + corridorW / 2, ROOM_H + 0.02, 0);
            scene.add(corrCeiling);

            // Ceiling beams matching the reference photo
            [-4.5, -0.9, 4.5].forEach((bz) => {
                const beam = new THREE.Mesh(
                    new THREE.BoxGeometry(corridorW, 0.18, 0.24),
                    corrCeilingMat
                );
                beam.position.set(ROOM_W / 2 + corridorW / 2, ROOM_H - 0.08, bz);
                scene.add(beam);
            });

            // 2 Corridor Ceiling Fluorescent Tube Lights + Soft Corridor Illumination
            const corrLightHousingMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.3, roughness: 0.4 });
            const corrLightGlowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            [-2.45, 1.85].forEach((lz) => {
                const fix = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 1.25), corrLightHousingMat);
                fix.position.set(ROOM_W / 2 + 1.85, ROOM_H - 0.02, lz);
                const glow = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 1.18), corrLightGlowMat);
                glow.rotation.x = Math.PI / 2;
                glow.position.set(ROOM_W / 2 + 1.85, ROOM_H - 0.042, lz);
                scene.add(fix, glow);

                const corrLight = new THREE.PointLight(0xfffbeb, 0.34, 14);
                corrLight.position.set(ROOM_W / 2 + 2.4, ROOM_H - 0.35, lz);
                scene.add(corrLight);
            });

            // Corridor Columns & Blue Metal Safety Railing along the outer edge of the hallway
            const pillarMat = new THREE.MeshStandardMaterial({ color: 0xf3e5ab, roughness: 0.82 });
            const railBlueMat = new THREE.MeshStandardMaterial({ color: 0x017bd2, roughness: 0.4, metalness: 0.2 });
            const outerHallX = ROOM_W / 2 + corridorW - 0.22;
            [-5.5, -1.8, 1.8, 5.5].forEach((pz) => {
                const col = new THREE.Mesh(new THREE.BoxGeometry(0.32, ROOM_H, 0.32), pillarMat);
                col.position.set(outerHallX, ROOM_H / 2, pz);
                scene.add(col);
            });
            const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, corridorLen), railBlueMat);
            topRail.position.set(outerHallX, 0.96, 0);
            const botRail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, corridorLen), railBlueMat);
            botRail.position.set(outerHallX, 0.16, 0);
            scene.add(topRail, botRail);
            for (let rz = -6.2; rz <= 6.2; rz += 0.28) {
                const baluster = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.80, 8), railBlueMat);
                baluster.position.set(outerHallX, 0.56, rz);
                scene.add(baluster);
            }

            // Lush sunny green schoolyard trees outside the corridor
            [[7.2, 6.2], [11.2, 4.2], [11.5, -0.5], [11.2, -4.5]].forEach(([tx, tz]) => {
                const tree = new THREE.Group();
                tree.position.set(tx, -0.2, tz);
                const trunk = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.18, 0.26, 2.8, 10),
                    new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.9 })
                );
                trunk.position.y = 1.4;
                tree.add(trunk);
                const foliageMat = new THREE.MeshStandardMaterial({ color: 0x38a169, roughness: 0.72 });
                [[-0.4, 2.9, 0], [0.4, 3.0, 0.3], [0, 3.4, -0.2]].forEach(([fx, fy, fz]) => {
                    const crown = new THREE.Mesh(new THREE.SphereGeometry(1.18, 12, 12), foliageMat);
                    crown.position.set(fx, fy, fz);
                    tree.add(crown);
                });
                scene.add(tree);
            });

            // Roof parapet slab over both classrooms
            const roofSlab = new THREE.Mesh(
                new THREE.BoxGeometry(ROOM_W * 2 + 0.3, 0.18, ROOM_D + 0.3),
                new THREE.MeshStandardMaterial({ color: 0xe6d7a3, roughness: 0.85 })
            );
            roofSlab.position.set(ROOM_W / 2, ROOM_H + 0.09, 0);
            scene.add(roofSlab);
        }

        // ============================================================================
        // CLASSROOM ARCHITECTURE (WALLS #E5DFC5, FLOOR, CEILING, FANS & LIGHTS)
        // ============================================================================
        function buildClassroomArchitecture() {
            const wallPlasterTex = createClassroomWallPlasterTexture();
            const wallMat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                map: wallPlasterTex,
                roughness: 0.92,
                metalness: 0.0
            });

            // 1. Ceramic Tiled Floor
            const floorTex = createFloorTileTexture();
            const floorMat = new THREE.MeshStandardMaterial({
                map: floorTex,
                roughness: 0.72,
                metalness: 0.02
            });
            const floor = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), floorMat);
            floor.rotation.x = -Math.PI / 2;
            floor.receiveShadow = true;
            scene.add(floor);

            // 2. Concrete Ceiling
            const ceiling = new THREE.Mesh(
                new THREE.PlaneGeometry(ROOM_W, ROOM_D),
                new THREE.MeshStandardMaterial({
                    map: createConcreteCeilingTexture(),
                    roughness: 0.9
                })
            );
            ceiling.rotation.x = Math.PI / 2;
            ceiling.position.y = ROOM_H;
            scene.add(ceiling);

            // 3. Front Wall (-Z) & Back Wall (+Z)
            const frontWall = new THREE.Mesh(new THREE.BoxGeometry(ROOM_W, ROOM_H, 0.14), wallMat);
            frontWall.position.set(0, ROOM_H / 2, -ROOM_D / 2 - 0.07);
            frontWall.receiveShadow = true;
            scene.add(frontWall);

            const backWall = new THREE.Mesh(new THREE.BoxGeometry(ROOM_W, ROOM_H, 0.14), wallMat);
            backWall.position.set(0, ROOM_H / 2, ROOM_D / 2 + 0.07);
            scene.add(backWall);

            // 4. Right Wall (+X) with Connected 2-Leaf Doorway (z: -3.40..-1.80, y: 0..2.68) & 3-Bay Corridor Window (z: +0.85..+3.65, y: 0.96..2.68)
            const rightWallX = ROOM_W / 2 + 0.07;
            // Pier 1: -4.50 to -3.40 (length 1.10)
            const rwPierRight = new THREE.Mesh(new THREE.BoxGeometry(0.14, ROOM_H, 1.10), wallMat);
            rwPierRight.position.set(rightWallX, ROOM_H / 2, -3.95);
            rwPierRight.receiveShadow = true;

            // Lintel above doorway & transom: -3.40 to -1.80 (length 1.60, y: 2.68..3.80 -> height 1.12)
            const rwDoorLintel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.12, 1.60), wallMat);
            rwDoorLintel.position.set(rightWallX, 2.68 + 0.56, -2.60);
            rwDoorLintel.receiveShadow = true;

            // Center Pier (holds "LỚP 5A" sign, "GÓC XANH TỰ QUẢN" board & opened left door leaf): -1.80 to +0.85 (length 2.65)
            const rwCenterPier = new THREE.Mesh(new THREE.BoxGeometry(0.14, ROOM_H, 2.65), wallMat);
            rwCenterPier.position.set(rightWallX, ROOM_H / 2, -0.475);
            rwCenterPier.receiveShadow = true;

            // Sill wall below 3-bay window: +0.85 to +3.65 (length 2.80, y: 0..0.96)
            const rwWinSill = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.96, 2.80), wallMat);
            rwWinSill.position.set(rightWallX, 0.48, 2.25);
            rwWinSill.receiveShadow = true;

            // Lintel above 3-bay window: +0.85 to +3.65 (length 2.80, y: 2.68..3.80 -> height 1.12)
            const rwWinLintel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.12, 2.80), wallMat);
            rwWinLintel.position.set(rightWallX, 2.68 + 0.56, 2.25);
            rwWinLintel.receiveShadow = true;

            // Far-left Pier: +3.65 to +4.50 (length 0.85)
            const rwPierLeft = new THREE.Mesh(new THREE.BoxGeometry(0.14, ROOM_H, 0.85), wallMat);
            rwPierLeft.position.set(rightWallX, ROOM_H / 2, 4.075);
            rwPierLeft.receiveShadow = true;

            // Terracotta skirting baseboard along the exterior corridor wall
            const baseboardMat = new THREE.MeshStandardMaterial({ color: 0xc28e6b, roughness: 0.7 });
            const bbLeft = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.11, 6.30), baseboardMat);
            bbLeft.position.set(rightWallX + 0.075, 0.055, 1.35);
            const bbRight = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.11, 1.10), baseboardMat);
            bbRight.position.set(rightWallX + 0.075, 0.055, -3.95);

            scene.add(rwPierRight, rwDoorLintel, rwCenterPier, rwWinSill, rwWinLintel, rwPierLeft, bbLeft, bbRight);

            // 5. Left Wall (-X) with Window Opening so camera & sunlight pass through cleanly
            const leftWallX = -ROOM_W / 2 - 0.07;
            // Bottom sill wall
            const leftBottom = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.05, ROOM_D), wallMat);
            leftBottom.position.set(leftWallX, 0.525, 0);
            // Top lintel wall
            const leftTop = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.85, ROOM_D), wallMat);
            leftTop.position.set(leftWallX, ROOM_H - 0.425, 0);
            // Front pillar
            const leftFrontPillar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.9, 1.3), wallMat);
            leftFrontPillar.position.set(leftWallX, 2.0, -ROOM_D / 2 + 0.65);
            // Back pillar
            const leftBackPillar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.9, 4.7), wallMat);
            leftBackPillar.position.set(leftWallX, 2.0, 2.15);
            scene.add(leftBottom, leftTop, leftFrontPillar, leftBackPillar);

            // 6. Raised Tiled Podium ("Bục Giảng")
            const podiumW = 6.6;
            const podiumD = 1.65;
            const podiumH = 0.18;
            const podiumMat = new THREE.MeshStandardMaterial({
                map: floorTex,
                roughness: 0.75,
                metalness: 0.02
            });
            const podium = new THREE.Mesh(new THREE.BoxGeometry(podiumW, podiumH, podiumD), podiumMat);
            podium.position.set(-ROOM_W / 2 + podiumW / 2, podiumH / 2, -ROOM_D / 2 + podiumD / 2);
            podium.receiveShadow = true;
            scene.add(podium);

            // 7. Four Green 3-Blade Ceiling Fans (2 in Front Row z = -1.25 + 2 in Back Row z = 1.75)
            const fanMat = new THREE.MeshStandardMaterial({ color: 0x2eb872, roughness: 0.4, metalness: 0.2 });
            [-1.25, 1.75].forEach((fz) => {
                [-1.55, 1.55].forEach((fx) => {
                    const fanGroup = new THREE.Group();
                    fanGroup.position.set(fx, ROOM_H - 0.42, fz);

                    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 12), fanMat);
                    rod.position.y = 0.21;
                    fanGroup.add(rod);

                    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.08, 20), fanMat);
                    fanGroup.add(motor);

                    const bladesGroup = new THREE.Group();
                    for (let b = 0; b < 3; b++) {
                        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.012, 0.13), fanMat);
                        blade.position.x = 0.42;
                        const pivot = new THREE.Group();
                        pivot.rotation.y = (b * Math.PI * 2) / 3;
                        pivot.add(blade);
                        bladesGroup.add(pivot);
                    }
                    fanGroup.add(bladesGroup);
                    ceilingFans.push(bladesGroup);
                    scene.add(fanGroup);
                });
            });

            // 8. Six Suspended Fluorescent Light Fixtures (3 in Front Row z = -1.25 + 3 in Back Row z = 1.75)
            const housingMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.3, roughness: 0.45 });
            const cordMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.5 });
            const tubeMat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xfffef5,
                emissiveIntensity: 0.65
            });
            bulbEmissiveMaterials.push(tubeMat);

            [-1.25, 1.75].forEach((lz) => {
                [-2.85, 0.0, 2.85].forEach((lx) => {
                    const lightGroup = new THREE.Group();
                    lightGroup.position.set(lx, ROOM_H - 0.36, lz);

                    [-0.55, 0.55].forEach((cx) => {
                        const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.36, 8), cordMat);
                        cord.position.set(cx, 0.18, 0);
                        lightGroup.add(cord);
                    });

                    const housing = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.045, 0.18), housingMat);
                    lightGroup.add(housing);

                    const glowingTube = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.025, 0.14), tubeMat);
                    glowingTube.position.y = -0.02;
                    lightGroup.add(glowingTube);

                    scene.add(lightGroup);
                });
            });
        }

        // ============================================================================
        // FRONT WALL: UNCLE HO PORTRAIT, CHALKBOARD + TV, 5 TEACHINGS, TEACHER DESK
        // ============================================================================
        function buildFrontWallAndPodiumDetails() {
            const frontZ = -ROOM_D / 2;
            const podiumTopY = 0.18;

            // 1. Framed Portrait of Uncle Ho (Smaller & Raised High Near the Ceiling) + "TIÊN HỌC LỄ - HẬU HỌC VĂN" Plaque Right Below
            const portraitGroup = new THREE.Group();
            portraitGroup.position.set(-0.14, 3.35, frontZ + 0.03);

            const frameWoodMat = new THREE.MeshStandardMaterial({
                map: createWoodTexture('#b87a3d', '#7c4d1f'),
                roughness: 0.45
            });
            const frameOuter = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.80, 0.032), frameWoodMat);
            frameOuter.castShadow = true;
            portraitGroup.add(frameOuter);

            uncleHoPortraitMaterial = new THREE.MeshBasicMaterial({
                map: createUncleHoPortraitTexture()
            });
            const portraitPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.74), uncleHoPortraitMaterial);
            portraitPlane.position.z = 0.018;
            portraitGroup.add(portraitPlane);
            scene.add(portraitGroup);

            // 1B. Royal-Blue Motto Plaque "[ TIÊN HỌC LỄ - HẬU HỌC VĂN ]" Directly Below Uncle Ho's Portrait
            const tienHocLeGroup = new THREE.Group();
            tienHocLeGroup.position.set(-0.14, 2.68, frontZ + 0.028);

            const thlBacking = new THREE.Mesh(
                new THREE.BoxGeometry(1.68, 0.30, 0.024),
                new THREE.MeshStandardMaterial({ color: 0x0036b8, roughness: 0.35 })
            );
            thlBacking.castShadow = true;
            tienHocLeGroup.add(thlBacking);

            tienHocLeMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.32
            });
            const thlFace = new THREE.Mesh(new THREE.PlaneGeometry(1.66, 0.285), tienHocLeMaterial);
            thlFace.position.z = 0.013;
            tienHocLeGroup.add(thlFace);
            scene.add(tienHocLeGroup);

            // 2. Full-Width 4-Panel Sliding Green Chalkboard with Wider Side Wings & Central Smart TV
            const boardGroup = new THREE.Group();
            boardGroup.position.set(-0.14, 1.72, frontZ + 0.04);

            const totalBoardW = 3.64;
            const aluMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.6, roughness: 0.3 });
            const boardBacking = new THREE.Mesh(new THREE.BoxGeometry(totalBoardW, 1.26, 0.04), aluMat);
            boardGroup.add(boardBacking);

            const chalkMat = new THREE.MeshStandardMaterial({
                map: createChalkboardTexture(),
                roughness: 0.65
            });

            // Fixed Left & Right Green Chalkboard Panels on the outer left & right sides
            [-1.21, 1.21].forEach((fx) => {
                const fixedSidePanel = new THREE.Mesh(new THREE.BoxGeometry(1.16, 1.16, 0.022), chalkMat);
                fixedSidePanel.position.set(fx, 0, 0.046);
                boardGroup.add(fixedSidePanel);
            });

            // Left & Right Sliding Green Chalkboard Wings ("Bảng thứ 2"):
            // Placed at z = 0.074 (in front of the rear fixed green board at z = 0.046 and Vườn hoa thi đua at z = 0.058).
            // Starts at inX = ±0.58 so the vertical Vườn hoa thi đua on the rear green board is visible; when pushed onto the rear board (outX = ±1.21), the 2nd board slides right over Vườn hoa thi đua and covers it!
            vuonHoaThiDuaMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                transparent: true,
                alphaTest: 0.12,
                roughness: 0.38
            });

            boardWings = [];
            [[-1.21, -0.58], [1.21, 0.58]].forEach(([outX, inX], wIdx) => {
                const wing = new THREE.Mesh(new THREE.BoxGeometry(1.16, 1.16, 0.022), chalkMat);
                wing.position.set(inX, 0, 0.074);
                wing.userData = { outX, inX, progress: 1, target: 1 };
                wing.castShadow = true;

                // Vertical aluminium trim stiles on each sliding wing
                [-0.57, 0.57].forEach((tx) => {
                    const stile = new THREE.Mesh(new THREE.BoxGeometry(0.018, 1.17, 0.026), aluMat);
                    stile.position.set(tx, 0, 0.002);
                    wing.add(stile);
                });

                boardGroup.add(wing);
                boardWings.push(wing);
            });

            // Vertical "Vườn hoa thi đua (Nhóm 1 – Nhóm 6)" + "Hoa cá nhân" & "Sao hợp tác" pasted directly onto the rear left green chalkboard (z = 0.058, behind the 2nd sliding wing at z = 0.074)
            const vuonHoaFrontGroup = new THREE.Group();
            const vhW = 0.58, vhH = 1.02;
            vuonHoaFrontGroup.position.set(-1.475, 0.0, 0.058);

            const vhFrontPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(vhW, vhH),
                vuonHoaThiDuaMaterial
            );
            vuonHoaFrontGroup.add(vhFrontPlane);

            // Thin 3D Pocket Relief Boxes for "Hoa cá nhân" (pink box) & "Sao hợp tác" (yellow box) that fit behind the sliding 2nd board (z <= 0.062 < 0.063 back face of sliding wing)
            const frontPinkPocket = new THREE.Mesh(
                new THREE.BoxGeometry(0.165, 0.115, 0.004),
                new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.42 })
            );
            frontPinkPocket.position.set(-0.116, -0.425, 0.002);
            const frontYellowPocket = new THREE.Mesh(
                new THREE.BoxGeometry(0.165, 0.115, 0.004),
                new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.42 })
            );
            frontYellowPocket.position.set(0.116, -0.425, 0.002);
            vuonHoaFrontGroup.add(frontPinkPocket, frontYellowPocket);
            boardGroup.add(vuonHoaFrontGroup);

            // Top & bottom aluminium rails the wider wings slide along
            [-0.595, 0.595].forEach((ry) => {
                const rail = new THREE.Mesh(new THREE.BoxGeometry(totalBoardW, 0.032, 0.045), aluMat);
                rail.position.set(0, ry, 0.062);
                boardGroup.add(rail);
            });

            // Central Smart TV Recessed Inside Board
            const tvFrame = new THREE.Mesh(
                new THREE.BoxGeometry(1.22, 0.82, 0.04),
                new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3 })
            );
            tvFrame.position.set(0, 0, 0.025);
            boardGroup.add(tvFrame);

            const tvScreen = new THREE.Mesh(
                new THREE.PlaneGeometry(1.14, 0.74),
                new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.18, metalness: 0.2 })
            );
            tvScreen.position.set(0, 0, 0.046);
            boardGroup.add(tvScreen);

            // Yellow sponge eraser on bottom tray
            const sponge = new THREE.Mesh(
                new THREE.BoxGeometry(0.12, 0.035, 0.05),
                new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.6 })
            );
            sponge.position.set(0.82, -0.58, 0.05);
            boardGroup.add(sponge);

            scene.add(boardGroup);

            // 3. Paired Ultra-HD Posters: "5 Điều Bác Hồ Dạy" + "Trích thư Hồ Chủ Tịch" & First Aid Box
            fiveTeachingsBoardMaterial = new THREE.MeshStandardMaterial({
                map: createUncleHoPosterPairTexture('fiveTeachings'),
                roughness: 0.45
            });
            const fiveBoard = new THREE.Mesh(
                new THREE.BoxGeometry(0.84, 1.15, 0.022),
                fiveTeachingsBoardMaterial
            );
            fiveBoard.position.set(-3.36, 2.25, frontZ + 0.02);
            scene.add(fiveBoard);

            letterQuoteBoardMaterial = new THREE.MeshStandardMaterial({
                map: createUncleHoPosterPairTexture('letterQuote'),
                roughness: 0.45
            });
            const quoteBoard = new THREE.Mesh(
                new THREE.BoxGeometry(0.84, 1.15, 0.022),
                letterQuoteBoardMaterial
            );
            quoteBoard.position.set(-2.46, 2.25, frontZ + 0.02);
            scene.add(quoteBoard);

            // 3D Interactive Medical First Aid Cabinet ("Hộp y tế") with Open/Close Hinged Door - Mounted right next to the left edge of the green chalkboard (x = -2.14) so it stays clear of the teacher's swivel chair
            firstAidCabinetGroup = new THREE.Group();
            firstAidCabinetGroup.position.set(-2.14, 1.38, frontZ + 0.068);
            firstAidCabinetGroup.rotation.y = 0;

            const faWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.26, metalness: 0.05 });
            const faInnerMat = new THREE.MeshStandardMaterial({ color: 0xdbeafe, roughness: 0.40 });
            const faSilverMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.82, roughness: 0.22 });
            const faRedMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.32 });

            const boxW = 0.38, boxH = 0.40, boxD = 0.13;

            // Back panel + 4 outer walls forming hollow interior cavity
            const backPanel = new THREE.Mesh(new THREE.BoxGeometry(boxW, boxH, 0.016), faWhiteMat);
            backPanel.position.z = -boxD / 2 + 0.008;
            backPanel.castShadow = true;
            firstAidCabinetGroup.add(backPanel);

            [-boxW / 2 + 0.014, boxW / 2 - 0.014].forEach((sx) => {
                const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.028, boxH, boxD), faWhiteMat);
                sideWall.position.set(sx, 0, 0);
                sideWall.castShadow = true;
                firstAidCabinetGroup.add(sideWall);
            });
            [-boxH / 2 + 0.014, boxH / 2 - 0.014].forEach((sy) => {
                const tbWall = new THREE.Mesh(new THREE.BoxGeometry(boxW, 0.028, boxD), faWhiteMat);
                tbWall.position.set(0, sy, 0);
                tbWall.castShadow = true;
                firstAidCabinetGroup.add(tbWall);
            });

            // 2 Top Silver Hanging Brackets with screw heads (matching image_c545a.jpg)
            [-0.115, 0.115].forEach((bx) => {
                const ear = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.036, 0.014), faSilverMat);
                ear.position.set(bx, boxH / 2 + 0.016, -boxD / 2 + 0.015);
                const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.018, 12), faWhiteMat);
                screw.rotation.x = Math.PI / 2;
                screw.position.set(bx, boxH / 2 + 0.016, -boxD / 2 + 0.016);
                firstAidCabinetGroup.add(ear, screw);
            });

            // Middle Shelf & Bottom Shelf inside the cabinet
            const midShelf = new THREE.Mesh(new THREE.BoxGeometry(boxW - 0.032, 0.014, boxD - 0.024), faInnerMat);
            midShelf.position.set(0, -0.005, -0.004);
            firstAidCabinetGroup.add(midShelf);

            // --- TOP SHELF MEDICAL SUPPLIES (y = 0.002) ---
            const glassJarMat = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.52, roughness: 0.15 });
            const blueLidMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35 });

            // 1. Jar of White Cotton Balls ("Hũ bông gòn")
            const cottonJar = new THREE.Group();
            cottonJar.position.set(-0.115, 0.002, -0.005);
            const cjBody = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.075, 16), glassJarMat);
            cjBody.position.y = 0.038;
            const cjLid = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.016, 16), blueLidMat);
            cjLid.position.y = 0.082;
            cottonJar.add(cjBody, cjLid);
            [[-0.012, 0.02, 0.01], [0.014, 0.022, 0.008], [0, 0.042, 0.012], [-0.01, 0.052, -0.008], [0.012, 0.05, 0]].forEach(([cx, cy, cz]) => {
                const ball = new THREE.Mesh(new THREE.SphereGeometry(0.013, 10, 10), faWhiteMat);
                ball.position.set(cx, cy, cz);
                cottonJar.add(ball);
            });
            firstAidCabinetGroup.add(cottonJar);

            // 2. Jar of Cotton Swabs ("Hũ tăm bông")
            const swabJar = new THREE.Group();
            swabJar.position.set(-0.032, 0.002, -0.005);
            const sjBody = cjBody.clone();
            const sjLid = cjLid.clone();
            swabJar.add(sjBody, sjLid);
            for (let s = 0; s < 9; s++) {
                const ang = (s / 9) * Math.PI * 2;
                const stick = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.002, 0.002, 0.055, 6),
                    new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 })
                );
                stick.position.set(Math.cos(ang) * 0.015, 0.034, Math.sin(ang) * 0.015);
                const tip = new THREE.Mesh(new THREE.SphereGeometry(0.005, 8, 8), faWhiteMat);
                tip.scale.set(0.8, 1.5, 0.8);
                tip.position.set(Math.cos(ang) * 0.015, 0.062, Math.sin(ang) * 0.015);
                swabJar.add(stick, tip);
            }
            firstAidCabinetGroup.add(swabJar);

            // 3. Blue & White Band-Aid Box ("Hộp băng cá nhân") + Green Box behind
            const bandAidBox = new THREE.Mesh(
                new THREE.BoxGeometry(0.115, 0.062, 0.042),
                new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.38 })
            );
            bandAidBox.position.set(0.082, 0.033, 0.008);
            const bandAidStrip = new THREE.Mesh(
                new THREE.BoxGeometry(0.062, 0.022, 0.004),
                new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.45 })
            );
            bandAidStrip.rotation.z = 0.22;
            bandAidStrip.position.set(0.082, 0.033, 0.030);
            const greenTopBox = new THREE.Mesh(
                new THREE.BoxGeometry(0.085, 0.072, 0.036),
                new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.42 })
            );
            greenTopBox.position.set(0.085, 0.038, -0.028);
            firstAidCabinetGroup.add(bandAidBox, bandAidStrip, greenTopBox);

            // --- BOTTOM SHELF MEDICAL SUPPLIES (y = -0.172) ---
            const botY = -0.172;
            // 1. Blue Antiseptic Bottle with White Cap
            const blueBottle = new THREE.Mesh(
                new THREE.CylinderGeometry(0.026, 0.026, 0.095, 16),
                new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85, roughness: 0.22 })
            );
            blueBottle.position.set(-0.122, botY + 0.048, 0.0);
            const blueCap = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.022, 14), faWhiteMat);
            blueCap.position.set(-0.122, botY + 0.106, 0.0);
            firstAidCabinetGroup.add(blueBottle, blueCap);

            // 2. Yellow Betadine Bottle with Red Cap
            const yellowBottle = new THREE.Mesh(
                new THREE.CylinderGeometry(0.023, 0.023, 0.078, 16),
                new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.32 })
            );
            yellowBottle.position.set(-0.065, botY + 0.039, 0.005);
            const redCap = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.020, 14), faRedMat);
            redCap.position.set(-0.065, botY + 0.086, 0.005);
            firstAidCabinetGroup.add(yellowBottle, redCap);

            // 3. Two White Rolls of Gauze Bandage
            const roll1 = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.048, 16), faWhiteMat);
            roll1.position.set(-0.005, botY + 0.024, 0.008);
            const roll2 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.034, 16), faWhiteMat);
            roll2.position.set(0.036, botY + 0.017, 0.014);
            firstAidCabinetGroup.add(roll1, roll2);

            // 4. Stack of 3 White Sterile Gauze Pads + Green Medical Gloves Box
            for (let g = 0; g < 3; g++) {
                const pad = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.014, 0.055), faWhiteMat);
                pad.position.set(0.102, botY + 0.008 + g * 0.015, 0.012);
                firstAidCabinetGroup.add(pad);
            }
            const glovesBox = new THREE.Mesh(
                new THREE.BoxGeometry(0.082, 0.082, 0.038),
                new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.4 })
            );
            glovesBox.position.set(0.108, botY + 0.048, -0.024);
            firstAidCabinetGroup.add(glovesBox);

            // --- HINGED FRONT GLASS DOOR (firstAidDoorPivot, hinged on left edge x = -boxW/2 + 0.015) ---
            firstAidDoorPivot = new THREE.Group();
            firstAidDoorPivot.position.set(-boxW / 2 + 0.015, 0, boxD / 2);
            firstAidDoorPivot.userData = { targetRotY: 0 };

            const dOffset = boxW / 2 - 0.015;
            // Left & Right vertical door stiles + Top & Bottom horizontal door rails
            const topDoorRail = new THREE.Mesh(new THREE.BoxGeometry(boxW - 0.01, 0.078, 0.018), faWhiteMat);
            topDoorRail.position.set(dOffset, boxH / 2 - 0.039, 0.009);
            const botDoorRail = new THREE.Mesh(new THREE.BoxGeometry(boxW - 0.01, 0.036, 0.018), faWhiteMat);
            botDoorRail.position.set(dOffset, -boxH / 2 + 0.018, 0.009);
            const leftDoorStile = new THREE.Mesh(new THREE.BoxGeometry(0.042, boxH - 0.01, 0.018), faWhiteMat);
            leftDoorStile.position.set(0.016, 0, 0.009);
            const rightDoorStile = new THREE.Mesh(new THREE.BoxGeometry(0.052, boxH - 0.01, 0.018), faWhiteMat);
            rightDoorStile.position.set(boxW - 0.041, 0, 0.009);
            firstAidDoorPivot.add(topDoorRail, botDoorRail, leftDoorStile, rightDoorStile);

            // 2 Silver Barrel Hinges on Left Edge
            [0.09, -0.11].forEach((hy) => {
                const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.048, 12), faSilverMat);
                hinge.position.set(0.0, hy, 0.012);
                firstAidDoorPivot.add(hinge);
            });

            // Red Pill Header Badge "• Hộp y tế •" on Top Door Rail
            const headerCanvas = document.createElement('canvas');
            headerCanvas.width = 360; headerCanvas.height = 84;
            const hCtx = headerCanvas.getContext('2d');
            hCtx.fillStyle = '#e11d48';
            hCtx.beginPath(); hCtx.roundRect(4, 4, 352, 76, 38); hCtx.fill();
            hCtx.strokeStyle = '#be123c'; hCtx.lineWidth = 4;
            hCtx.beginPath(); hCtx.roundRect(4, 4, 352, 76, 38); hCtx.stroke();
            hCtx.fillStyle = '#ffffff';
            hCtx.beginPath(); hCtx.arc(28, 42, 7, 0, Math.PI * 2); hCtx.arc(332, 42, 7, 0, Math.PI * 2); hCtx.fill();
            hCtx.font = '900 44px Inter, sans-serif';
            hCtx.textAlign = 'center'; hCtx.textBaseline = 'middle';
            hCtx.fillText('Hộp y tế', 180, 44);
            const headerTex = new THREE.CanvasTexture(headerCanvas);
            headerTex.encoding = THREE.sRGBEncoding;

            const headerBadge = new THREE.Mesh(
                new THREE.PlaneGeometry(0.24, 0.054),
                new THREE.MeshStandardMaterial({ map: headerTex, transparent: true, alphaTest: 0.05, roughness: 0.3 })
            );
            headerBadge.position.set(dOffset, boxH / 2 - 0.040, 0.019);
            firstAidDoorPivot.add(headerBadge);

            // Transparent Glass Window Pane in the Door
            const doorGlass = new THREE.Mesh(
                new THREE.PlaneGeometry(0.27, 0.27),
                new THREE.MeshStandardMaterial({
                    color: 0xe0f2fe,
                    transparent: true,
                    opacity: 0.26,
                    roughness: 0.12,
                    metalness: 0.15,
                    side: THREE.DoubleSide
                })
            );
            doorGlass.position.set(dOffset - 0.005, -0.022, 0.009);
            firstAidDoorPivot.add(doorGlass);

            // Circular White & Red Cross Emblem in the Center of the Glass Window
            const emblemGroup = new THREE.Group();
            emblemGroup.position.set(dOffset - 0.005, -0.022, 0.013);
            const whiteDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.006, 28), faWhiteMat);
            whiteDisc.rotation.x = Math.PI / 2;
            const redRing = new THREE.Mesh(new THREE.RingGeometry(0.052, 0.057, 28), faRedMat);
            redRing.position.z = 0.004;
            const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.024, 0.008), faRedMat);
            crossH.position.z = 0.004;
            const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.068, 0.008), faRedMat);
            crossV.position.z = 0.004;
            emblemGroup.add(whiteDisc, redRing, crossH, crossV);
            firstAidDoorPivot.add(emblemGroup);

            // Silver Pull Handle & Keyhole Lock on Right Door Stile
            const faHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.076, 12), faSilverMat);
            faHandle.position.set(boxW - 0.041, -0.015, 0.024);
            const faLock = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.006, 16), faSilverMat);
            faLock.rotation.x = Math.PI / 2;
            faLock.position.set(boxW - 0.041, -0.075, 0.019);
            firstAidDoorPivot.add(faHandle, faLock);

            firstAidCabinetGroup.add(firstAidDoorPivot);
            scene.add(firstAidCabinetGroup);

            // 4. Glass-Door Wooden Teacher Cabinet with Blue Binders, Books & Trailing Pothos Vine
            // Matches "Góc Bàn Giáo Viên Sáng Đẹp.png"
            const cabinetGroup = new THREE.Group();
            cabinetGroup.position.set(-4.12, podiumTopY, frontZ + 0.32);

            const cabWoodMat = new THREE.MeshStandardMaterial({
                map: createWoodTexture('#d89c54', '#a16625'),
                roughness: 0.48
            });
            const cabBack = new THREE.Mesh(new THREE.BoxGeometry(0.88, 1.88, 0.025), cabWoodMat);
            cabBack.position.set(0, 0.94, -0.20);
            cabinetGroup.add(cabBack);

            // Lower enclosed wooden cabinet section
            const cabLower = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.72, 0.42), cabWoodMat);
            cabLower.position.set(0, 0.36, 0);
            cabLower.castShadow = true;
            cabinetGroup.add(cabLower);

            // Upper glass-front cabinet frame (side walls, top, middle shelf, center divider)
            [-0.42, 0.42].forEach((sx) => {
                const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.16, 0.42), cabWoodMat);
                sideWall.position.set(sx, 1.30, 0);
                sideWall.castShadow = true;
                cabinetGroup.add(sideWall);
            });
            const centerDivider = new THREE.Mesh(new THREE.BoxGeometry(0.028, 1.14, 0.38), cabWoodMat);
            centerDivider.position.set(0, 1.30, 0);
            cabinetGroup.add(centerDivider);

            [1.10, 1.48, 1.86].forEach((sy) => {
                const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.03, 0.40), cabWoodMat);
                shelf.position.set(0, sy, 0);
                cabinetGroup.add(shelf);
            });

            // 3 Blue Ring Binders ("Bìa còng hồ sơ xanh dương") on top-right compartment
            [0.09, 0.19, 0.29].forEach((bx) => {
                const binder = new THREE.Mesh(
                    new THREE.BoxGeometry(0.075, 0.31, 0.26),
                    new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 })
                );
                binder.position.set(bx, 1.66, -0.02);
                cabinetGroup.add(binder);

                // White spine label & silver ring hole
                const hole = new THREE.Mesh(
                    new THREE.CircleGeometry(0.014, 12),
                    new THREE.MeshBasicMaterial({ color: 0xf8fafc })
                );
                hole.position.set(bx, 1.58, 0.112);
                cabinetGroup.add(hole);
            });

            // Stack of white paper reams on middle-right shelf
            for (let p = 0; p < 5; p++) {
                const paperStack = new THREE.Mesh(
                    new THREE.BoxGeometry(0.24, 0.028, 0.22),
                    new THREE.MeshStandardMaterial({ color: p === 4 ? 0xdc2626 : 0xf8fafc, roughness: 0.6 })
                );
                paperStack.position.set(0.20, 1.14 + p * 0.03, -0.02);
                cabinetGroup.add(paperStack);
            }

            // Colorful books on middle-left shelf
            const bookCols = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6, 0x06b6d4];
            for (let b = 0; b < 7; b++) {
                const bk = new THREE.Mesh(
                    new THREE.BoxGeometry(0.036, 0.26, 0.22),
                    new THREE.MeshStandardMaterial({ color: bookCols[b % bookCols.length], roughness: 0.5 })
                );
                bk.position.set(-0.34 + b * 0.044, 1.25, -0.02);
                bk.rotation.z = -0.06;
                cabinetGroup.add(bk);
            }

            // Glass panes & silver handles on the 2 upper doors
            const glassDoorMat = new THREE.MeshStandardMaterial({
                color: 0xe0f2fe,
                transparent: true,
                opacity: 0.28,
                roughness: 0.15,
                metalness: 0.2
            });
            [-0.21, 0.21].forEach((dx, idx) => {
                const glassPane = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 1.06), glassDoorMat);
                glassPane.position.set(dx, 1.30, 0.212);
                cabinetGroup.add(glassPane);

                const handle = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.008, 0.008, 0.14, 10),
                    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.2 })
                );
                handle.position.set(idx === 0 ? -0.035 : 0.035, 1.24, 0.222);
                cabinetGroup.add(handle);
            });

            // Lush Trailing Green Pothos Plant on Top-Left of Cabinet cascading down
            const cabPot = new THREE.Mesh(
                new THREE.CylinderGeometry(0.11, 0.085, 0.14, 16),
                new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 })
            );
            cabPot.position.set(-0.24, 1.95, 0.02);
            cabinetGroup.add(cabPot);

            const vineMat1 = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.45 });
            const vineMat2 = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.45 });
            const cabHeartGeo = getRealisticHeartLeafGeometry();
            for (let c = 0; c < 22; c++) {
                const ang = (c / 22) * Math.PI * 2;
                const crownLeaf = new THREE.Mesh(cabHeartGeo, c % 2 === 0 ? vineMat1 : vineMat2);
                crownLeaf.scale.set(0.85, 0.85, 0.85);
                crownLeaf.position.set(-0.24 + Math.cos(ang) * 0.085, 2.03 + (c % 3) * 0.025, 0.02 + Math.sin(ang) * 0.085);
                crownLeaf.rotation.y = -ang + Math.PI / 2;
                crownLeaf.rotation.x = 0.45;
                cabinetGroup.add(crownLeaf);
            }
            for (let v = 0; v < 16; v++) {
                const trailLeaf = new THREE.Mesh(cabHeartGeo, v % 2 === 0 ? vineMat1 : vineMat2);
                const s = (1.0 - v * 0.025) * 0.82;
                trailLeaf.scale.set(s, s, s);
                trailLeaf.position.set(
                    -0.31 + Math.sin(v * 0.9) * 0.045,
                    1.88 - v * 0.055,
                    0.225
                );
                trailLeaf.rotation.x = 0.25;
                trailLeaf.rotation.z = (v % 2 === 0 ? -0.22 : 0.22);
                cabinetGroup.add(trailLeaf);
            }

            scene.add(cabinetGroup);

            // Tall White Potted Green Plant next to Teacher Desk near the Window
            const teacherSidePlant = createPottedPlant(0.15, 0.72, false);
            teacherSidePlant.position.set(-4.22, podiumTopY, -3.22);
            scene.add(teacherSidePlant);

            // 5. Teacher's Desk & Swivel Royal-Blue Office Chair (Exact match to "Góc Bàn Giáo Viên Sáng Đẹp.png")
            const deskGroup = new THREE.Group();
            deskGroup.position.set(-2.95, podiumTopY, -3.32);

            const tWoodMat = new THREE.MeshStandardMaterial({
                map: createHoneyOakWoodTexture(),
                roughness: 0.44
            });
            const tSteelMat = new THREE.MeshStandardMaterial({
                color: 0xd4d8dd,
                metalness: 0.38,
                roughness: 0.38
            });
            const blackCapMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.7 });

            // Tabletop
            const tTop = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.036, 0.74), tWoodMat);
            tTop.position.y = 0.76;
            tTop.castShadow = true;
            tTop.receiveShadow = true;
            deskGroup.add(tTop);

            // Wooden Front Modesty Panel
            const tFrontPanel = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.48, 0.026), tWoodMat);
            tFrontPanel.position.set(0, 0.48, 0.31);
            tFrontPanel.castShadow = true;
            deskGroup.add(tFrontPanel);

            // U-Shaped Square Steel Frame Legs on Left & Right with Black Adjustable Leveler Feet
            [-0.66, 0.66].forEach((lx) => {
                [-0.31, 0.31].forEach((lz) => {
                    const vLeg = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.74, 0.038), tSteelMat);
                    vLeg.position.set(lx, 0.37, lz);
                    vLeg.castShadow = true;
                    deskGroup.add(vLeg);

                    const footPad = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.026, 0.02, 14), blackCapMat);
                    footPad.position.set(lx, 0.01, lz);
                    deskGroup.add(footPad);
                });
                const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.036, 0.66), tSteelMat);
                bottomBar.position.set(lx, 0.06, 0);
                deskGroup.add(bottomBar);
            });

            // 5A. SWIVEL ROYAL-BLUE ERGONOMIC OFFICE CHAIR (teacherChairSwivelGroup)
            const chairRoot = new THREE.Group();
            chairRoot.position.set(0.32, 0, -0.52);
            deskGroup.add(chairRoot);

            const blackPlasticMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.45, metalness: 0.15 });
            const royalBlueFabricMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.78, metalness: 0.02 });

            // Stationary 5-Star Base + Dual Caster Wheels + Central Hydraulic Cylinder
            const centerHub = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.048, 0.08, 16), blackPlasticMat);
            centerHub.position.y = 0.10;
            chairRoot.add(centerHub);

            const gasPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.030, 0.34, 16), blackPlasticMat);
            gasPiston.position.y = 0.26;
            chairRoot.add(gasPiston);

            for (let k = 0; k < 5; k++) {
                const ang = (k * Math.PI * 2) / 5;
                const legArm = new THREE.Group();
                legArm.rotation.y = ang;

                const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.028, 0.28), blackPlasticMat);
                spoke.position.set(0, 0.085, 0.14);
                spoke.rotation.x = 0.12;
                legArm.add(spoke);

                // Dual Caster Wheel at tip
                const casterHood = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.045, 14), blackPlasticMat);
                casterHood.rotation.z = Math.PI / 2;
                casterHood.position.set(0, 0.028, 0.27);
                legArm.add(casterHood);

                chairRoot.add(legArm);
            }

            // Rotating Upper Assembly (Seat, Backrest, Armrests, Height Lever)
            teacherChairSwivelGroup = new THREE.Group();
            teacherChairSwivelGroup.position.y = 0.44;
            teacherChairSwivelGroup.rotation.y = teacherChairTargetYaw;
            chairRoot.add(teacherChairSwivelGroup);

            // Height Adjustment Lever under seat
            const leverRod = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.16, 8), blackPlasticMat);
            leverRod.rotation.z = Math.PI / 2 + 0.3;
            leverRod.position.set(-0.14, -0.04, 0.04);
            const leverPaddle = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.014, 0.028), blackPlasticMat);
            leverPaddle.position.set(-0.21, -0.065, 0.04);
            teacherChairSwivelGroup.add(leverRod, leverPaddle);

            // Thick Contoured Royal-Blue Seat Cushion + Black Under-Shell
            const seatShell = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.21, 0.035, 24), blackPlasticMat);
            seatShell.scale.set(1.05, 1, 1.02);
            seatShell.position.y = -0.01;
            teacherChairSwivelGroup.add(seatShell);

            const seatCushion = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.235, 0.065, 28), royalBlueFabricMat);
            seatCushion.scale.set(1.06, 1, 1.04);
            seatCushion.position.y = 0.025;
            seatCushion.castShadow = true;
            teacherChairSwivelGroup.add(seatCushion);

            // Rear Spine Post connecting Seat to Backrest
            const spinePost = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.28, 0.028), blackPlasticMat);
            spinePost.position.set(0, 0.14, -0.23);
            spinePost.rotation.x = -0.08;
            teacherChairSwivelGroup.add(spinePost);

            // High Rounded Ergonomic Backrest with Black Outer Trim & Royal-Blue Upholstery
            const backGroup = new THREE.Group();
            backGroup.position.set(0, 0.34, -0.23);
            backGroup.rotation.x = -0.06;

            const backOuterShell = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.23, 0.038, 28), blackPlasticMat);
            backOuterShell.rotation.x = Math.PI / 2;
            backOuterShell.scale.set(1.04, 1.0, 1.38);
            backOuterShell.castShadow = true;
            backGroup.add(backOuterShell);

            const backBluePad = new THREE.Mesh(new THREE.CylinderGeometry(0.202, 0.212, 0.044, 28), royalBlueFabricMat);
            backBluePad.rotation.x = Math.PI / 2;
            backBluePad.scale.set(1.02, 1.0, 1.34);
            backBluePad.position.z = 0.008;
            backGroup.add(backBluePad);

            teacherChairSwivelGroup.add(backGroup);

            // Curved Black Loop Armrests on Left & Right
            [-0.245, 0.245].forEach((ax) => {
                const armLoop = new THREE.Mesh(
                    new THREE.TorusGeometry(0.135, 0.018, 12, 28, Math.PI * 1.25),
                    blackPlasticMat
                );
                armLoop.rotation.y = Math.PI / 2;
                armLoop.rotation.z = -0.35;
                armLoop.scale.set(1.15, 0.88, 1.0);
                armLoop.position.set(ax, 0.135, -0.04);
                armLoop.castShadow = true;
                teacherChairSwivelGroup.add(armLoop);

                // Top flat arm pad
                const armPad = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.018, 0.20), blackPlasticMat);
                armPad.position.set(ax, 0.248, -0.03);
                teacherChairSwivelGroup.add(armPad);
            });

            // 5B. Desktop Items on Teacher's Desk (matching "Góc Bàn Giáo Viên Sáng Đẹp.png")
            // Black Laptop with Silver Circular HP-style Logo facing forward + Wireless Mouse
            const laptopGroup = new THREE.Group();
            laptopGroup.position.set(0.04, 0.778, 0.02);
            laptopGroup.rotation.y = -0.18;

            const laptopBase = new THREE.Mesh(
                new THREE.BoxGeometry(0.34, 0.014, 0.24),
                new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35 })
            );
            const laptopScreen = new THREE.Mesh(
                new THREE.BoxGeometry(0.34, 0.22, 0.012),
                new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3 })
            );
            laptopScreen.position.set(0, 0.11, 0.115);
            laptopScreen.rotation.x = -0.22;

            const silverLogo = new THREE.Mesh(
                new THREE.CircleGeometry(0.024, 20),
                new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.2 })
            );
            silverLogo.position.set(0, 0.11, 0.122);
            silverLogo.rotation.x = -0.22;

            laptopGroup.add(laptopBase, laptopScreen, silverLogo);
            deskGroup.add(laptopGroup);

            // Black Wireless Mouse next to Laptop
            const mouseMesh = new THREE.Mesh(
                new THREE.SphereGeometry(0.032, 14, 14),
                new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.35 })
            );
            mouseMesh.scale.set(0.85, 0.45, 1.35);
            mouseMesh.position.set(-0.22, 0.785, 0.02);
            deskGroup.add(mouseMesh);

            // White Cylindrical Pen Cup with Orange Scissors & Pens
            const penCup = new THREE.Mesh(
                new THREE.CylinderGeometry(0.042, 0.040, 0.11, 18),
                new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
            );
            penCup.position.set(-0.34, 0.833, 0.08);
            penCup.castShadow = true;
            deskGroup.add(penCup);

            // Orange scissors handles & pens inside white cup
            [-0.014, 0.014].forEach((ox) => {
                const scLoop = new THREE.Mesh(
                    new THREE.TorusGeometry(0.014, 0.005, 8, 16),
                    new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.35 })
                );
                scLoop.position.set(-0.35 + ox, 0.905, 0.08);
                deskGroup.add(scLoop);
            });
            [0x1d4ed8, 0x1e293b, 0xdc2626].forEach((pCol, idx) => {
                const pen = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.004, 0.004, 0.13, 8),
                    new THREE.MeshStandardMaterial({ color: pCol, roughness: 0.4 })
                );
                pen.position.set(-0.33 + idx * 0.012, 0.86, 0.075);
                pen.rotation.z = -0.12 + idx * 0.08;
                deskGroup.add(pen);
            });

            // Neat Stack of Colorful Textbooks on Left Side of Teacher Desk
            [0x0284c7, 0xdc2626, 0xf59e0b, 0x10b981, 0xec4899, 0xf97316].forEach((col, i) => {
                const bk = new THREE.Mesh(
                    new THREE.BoxGeometry(0.25, 0.022, 0.19),
                    new THREE.MeshStandardMaterial({ color: col, roughness: 0.5 })
                );
                bk.position.set(-0.52, 0.79 + i * 0.023, 0.06);
                bk.castShadow = true;
                deskGroup.add(bk);
            });

            // Clear Glass Vase with Lush Pink Roses & Green Leaves on Right Side of Teacher Desk
            const vaseGroup = new THREE.Group();
            vaseGroup.position.set(0.46, 0.778, 0.12);

            const glassVase = new THREE.Mesh(
                new THREE.CylinderGeometry(0.052, 0.044, 0.15, 18),
                new THREE.MeshStandardMaterial({
                    color: 0xe0f2fe,
                    transparent: true,
                    opacity: 0.55,
                    roughness: 0.15,
                    metalness: 0.1
                })
            );
            glassVase.position.y = 0.075;
            vaseGroup.add(glassVase);

            // Stems inside vase
            const stemMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 });
            const stems = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.022, 0.14, 10), stemMat);
            stems.position.y = 0.075;
            vaseGroup.add(stems);

            // Green foliage leaves around bouquet base
            for (let l = 0; l < 10; l++) {
                const ang = (l / 10) * Math.PI * 2;
                const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.042, 8, 8), stemMat);
                leaf.scale.set(1.3, 0.35, 0.8);
                leaf.position.set(Math.cos(ang) * 0.075, 0.16, Math.sin(ang) * 0.075);
                leaf.rotation.y = -ang;
                vaseGroup.add(leaf);
            }

            // 12 Blooming Pink Roses
            for (let r = 0; r < 12; r++) {
                const roseColor = r % 3 === 0 ? 0xf43f5e : (r % 2 === 0 ? 0xfb7185 : 0xfda4af);
                const rose = new THREE.Mesh(
                    new THREE.SphereGeometry(0.036, 12, 12),
                    new THREE.MeshStandardMaterial({ color: roseColor, roughness: 0.45 })
                );
                const ringRadius = r < 4 ? 0.032 : 0.078;
                const ang = (r * 1.7) % (Math.PI * 2);
                rose.position.set(
                    Math.cos(ang) * ringRadius,
                    0.205 + (r < 4 ? 0.035 : 0.0),
                    Math.sin(ang) * ringRadius
                );
                vaseGroup.add(rose);
            }

            deskGroup.add(vaseGroup);
            scene.add(deskGroup);
        }

        // ============================================================================
        // FRONT-RIGHT WALL: "BẢNG TIN" + "GÓC SÁNG TẠO" (EXACT MATCH TO NEW PHOTOS)
        // ============================================================================
        function buildGocDanChuAndGocSangTao() {
            const frontZ = -ROOM_D / 2;
            const centerX = 3.15;

            // 1. Framed Board 1: "NỘI QUY LỚP HỌC (do học sinh xây dựng)" (image_c70f5d.jpg)
            const oakFrameMat = new THREE.MeshStandardMaterial({
                map: createHoneyOakWoodTexture(),
                roughness: 0.42
            });
            const metalBracketMat = new THREE.MeshStandardMaterial({
                color: 0xcbd5e1,
                metalness: 0.8,
                roughness: 0.25
            });

            noiQuyLopMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.45
            });
            noiQuyDienMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.45
            });

            const createFramedRuleBoard = (mat, xPos, yPos, w = 1.12, h = 0.78) => {
                const grp = new THREE.Group();
                grp.position.set(xPos, yPos, frontZ + 0.024);

                const backing = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.024), oakFrameMat);
                backing.castShadow = true;
                grp.add(backing);

                const face = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.02, h - 0.02), mat);
                face.position.z = 0.013;
                grp.add(face);

                // Top metal hanging eyelets matching the photo
                [-w * 0.34, w * 0.34].forEach((bx) => {
                    const eyelet = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.004, 8, 14), metalBracketMat);
                    eyelet.position.set(bx, h / 2 + 0.012, 0);
                    grp.add(eyelet);
                });
                return grp;
            };

            const noiQuyLopBoard = createFramedRuleBoard(noiQuyLopMaterial, 2.26, 1.88, 0.86, 1.11);
            const noiQuyDienBoard = createFramedRuleBoard(noiQuyDienMaterial, 3.50, 1.88, 1.12, 0.78);
            scene.add(noiQuyLopBoard, noiQuyDienBoard);

            // 2. Interactive 3D Electrical Switch Panel ("Bộ công tắc Đèn & Quạt") right beside "Nội quy sử dụng thiết bị điện"
            const switchPanelGroup = new THREE.Group();
            switchPanelGroup.position.set(4.36, 1.62, frontZ + 0.026);

            // Faceplate Canvas Texture with labels "CÔNG TẮC ĐIỆN", "ĐÈN", "QUẠT", "ON / OFF"
            const swCanvas = document.createElement('canvas');
            swCanvas.width = 360;
            swCanvas.height = 380;
            const sCtx = swCanvas.getContext('2d');
            sCtx.fillStyle = '#f8fafc';
            sCtx.fillRect(0, 0, 360, 380);
            sCtx.strokeStyle = '#94a3b8';
            sCtx.lineWidth = 8;
            sCtx.strokeRect(8, 8, 344, 364);

            // Header badge
            sCtx.fillStyle = '#0284c7';
            sCtx.fillRect(22, 20, 316, 52);
            sCtx.fillStyle = '#ffffff';
            sCtx.font = 'bold 26px Inter, sans-serif';
            sCtx.textAlign = 'center';
            sCtx.fillText('⚡ CÔNG TẮC ĐIỆN', 180, 55);

            // Left & Right switch slots
            [95, 265].forEach((cx, idx) => {
                sCtx.fillStyle = '#e2e8f0';
                sCtx.fillRect(cx - 58, 92, 116, 198);
                sCtx.strokeStyle = '#64748b';
                sCtx.lineWidth = 4;
                sCtx.strokeRect(cx - 58, 92, 116, 198);

                // ON badge
                sCtx.fillStyle = '#16a34a';
                sCtx.fillRect(cx - 32, 102, 64, 24);
                sCtx.fillStyle = '#ffffff';
                sCtx.font = 'bold 16px Inter, sans-serif';
                sCtx.fillText('ON', cx, 120);

                // OFF badge
                sCtx.fillStyle = '#dc2626';
                sCtx.fillRect(cx - 32, 256, 64, 24);
                sCtx.fillStyle = '#ffffff';
                sCtx.fillText('OFF', cx, 274);

                // Bottom label ("💡 ĐÈN" / "🌀 QUẠT")
                sCtx.fillStyle = idx === 0 ? '#b45309' : '#047857';
                sCtx.font = '900 26px Inter, sans-serif';
                sCtx.fillText(idx === 0 ? '💡 ĐÈN' : '🌀 QUẠT', cx, 338);
            });

            const swTex = new THREE.CanvasTexture(swCanvas);
            swTex.encoding = THREE.sRGBEncoding;

            const boxBody = new THREE.Mesh(
                new THREE.BoxGeometry(0.36, 0.38, 0.032),
                new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35 })
            );
            boxBody.castShadow = true;
            switchPanelGroup.add(boxBody);

            const boxFace = new THREE.Mesh(
                new THREE.PlaneGeometry(0.35, 0.37),
                new THREE.MeshStandardMaterial({ map: swTex, roughness: 0.35 })
            );
            boxFace.position.z = 0.017;
            switchPanelGroup.add(boxFace);

            const rockerWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
            wallLightLedMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
            wallFanLedMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });

            // Left Interactive Switch Group: Classroom Lights ("💡 ĐÈN")
            wallLightSwitchGroup = new THREE.Group();
            wallLightSwitchGroup.position.set(-0.082, -0.005, 0.022);
            wallLightSwitchGroup.userData = { switchType: 'lights' };

            const lightHitBox = new THREE.Mesh(
                new THREE.BoxGeometry(0.14, 0.28, 0.04),
                new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 })
            );
            wallLightSwitchGroup.add(lightHitBox);

            wallLightRocker = new THREE.Mesh(
                new THREE.BoxGeometry(0.068, 0.095, 0.024),
                rockerWhiteMat
            );
            wallLightRocker.rotation.x = -0.22; // Tilted ON
            wallLightRocker.castShadow = true;
            const lightLed = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.010, 0.006), wallLightLedMat);
            lightLed.position.set(0, 0.026, 0.013);
            wallLightRocker.add(lightLed);
            wallLightSwitchGroup.add(wallLightRocker);
            switchPanelGroup.add(wallLightSwitchGroup);

            // Right Interactive Switch Group: Ceiling Fans ("🌀 QUẠT")
            wallFanSwitchGroup = new THREE.Group();
            wallFanSwitchGroup.position.set(0.082, -0.005, 0.022);
            wallFanSwitchGroup.userData = { switchType: 'fans' };

            const fanHitBox = new THREE.Mesh(
                new THREE.BoxGeometry(0.14, 0.28, 0.04),
                new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 })
            );
            wallFanSwitchGroup.add(fanHitBox);

            wallFanRocker = new THREE.Mesh(
                new THREE.BoxGeometry(0.068, 0.095, 0.024),
                rockerWhiteMat
            );
            wallFanRocker.rotation.x = -0.22; // Tilted ON
            wallFanRocker.castShadow = true;
            const fanLed = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.010, 0.006), wallFanLedMat);
            fanLed.position.set(0, 0.026, 0.013);
            wallFanRocker.add(fanLed);
            wallFanSwitchGroup.add(wallFanRocker);
            switchPanelGroup.add(wallFanSwitchGroup);

            scene.add(switchPanelGroup);

        }

        // ============================================================================
        // LEFT WALL WINDOW & COMPLETE 6-ZONE BACK WALL ENSEMBLE (image_c45100.jpg):
        // [1. Góc đọc sách | 2. Bảng định hướng hành vi | 3. Góc bình tĩnh |
        //  4. Bảng tổng kết thi đua | 5. Góc sáng tạo | 6. Thùng rác]
        // ============================================================================
        function createPillTextSignTexture(text, bgHex, borderHex, textHex = '#ffffff') {
            const canvas = document.createElement('canvas');
            canvas.width = 420;
            canvas.height = 84;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = bgHex;
            ctx.beginPath(); ctx.roundRect(6, 6, 408, 72, 36); ctx.fill();
            ctx.strokeStyle = borderHex; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.roundRect(6, 6, 408, 72, 36); ctx.stroke();
            ctx.fillStyle = textHex;
            ctx.font = '900 30px Inter, sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(text, 210, 44);
            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.anisotropy = 8;
            return tex;
        }

        function createShagRugTileTexture(baseHex, lightHex, darkHex) {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = baseHex;
            ctx.fillRect(0, 0, 512, 512);
            for (let i = 0; i < 4200; i++) {
                ctx.fillStyle = i % 2 === 0 ? lightHex : darkHex;
                const rx = Math.random() * 512;
                const ry = Math.random() * 512;
                ctx.beginPath();
                ctx.ellipse(rx, ry, 5 + Math.random() * 5, 2.5 + Math.random() * 2.5, Math.random() * Math.PI, 0, Math.PI * 2);
                ctx.fill();
            }
            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            return tex;
        }

        function createSixPetalFlowerCushion(petalHex, centerHex, scale = 1.0) {
            const cushion = new THREE.Group();
            const petalMat = new THREE.MeshStandardMaterial({ color: petalHex, roughness: 0.68 });
            const centerMat = new THREE.MeshStandardMaterial({ color: centerHex, roughness: 0.62 });
            for (let p = 0; p < 6; p++) {
                const ang = (p / 6) * Math.PI * 2;
                const petal = new THREE.Mesh(new THREE.SphereGeometry(0.115 * scale, 16, 14), petalMat);
                petal.scale.set(1.05, 0.46, 1.22);
                petal.position.set(Math.cos(ang) * 0.135 * scale, 0, Math.sin(ang) * 0.135 * scale);
                petal.rotation.y = -ang;
                petal.castShadow = true;
                cushion.add(petal);
            }
            const centerPad = new THREE.Mesh(new THREE.SphereGeometry(0.095 * scale, 16, 14), centerMat);
            centerPad.scale.set(1.0, 0.50, 1.0);
            centerPad.position.y = 0.012 * scale;
            cushion.add(centerPad);
            return cushion;
        }

        function buildLeftWallWindowAndGocDocSach() {
            const leftX = -ROOM_W / 2;
            const rightX = ROOM_W / 2;
            const backZ = ROOM_D / 2;

            // 1. Large Left-Wall Window with Security Bars & Blue Tie-Back Curtains
            const winGroup = new THREE.Group();
            winGroup.position.set(leftX + 0.04, 2.0, -1.7);

            const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.4 });
            const barMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.5, roughness: 0.35 });

            const winTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 3.0), frameMat);
            winTop.position.y = 0.92;
            const winBot = winTop.clone();
            winBot.position.y = -0.92;
            const winMid = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.84, 0.06), frameMat);
            winGroup.add(winTop, winBot, winMid);

            for (let y = -0.7; y <= 0.7; y += 0.28) {
                const hBar = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 2.95, 8), barMat);
                hBar.rotation.x = Math.PI / 2;
                hBar.position.set(0, y, 0);
                winGroup.add(hBar);
            }
            for (let z = -1.2; z <= 1.2; z += 0.48) {
                const vBar = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.84, 8), barMat);
                vBar.position.set(0, 0, z);
                winGroup.add(vBar);
            }

            const curtainMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.7 });
            [-1.38, 1.38].forEach((cz) => {
                const drape = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 2.05, 16), curtainMat);
                drape.scale.set(0.45, 1, 1.35);
                drape.position.set(0.06, -0.02, cz);
                winGroup.add(drape);
            });
            scene.add(winGroup);

            // ========================================================================
            // INITIALIZE ULTRA-HD MATERIALS FOR ALL 6 BACK-WALL ZONES
            // ========================================================================
            hanhViTichCucMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            gocBinhTinhMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            bangTongKetMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            docSachBannerMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            noiQuyDocSachMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            docSachShelfFrontMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.40 });
            sangTaoBannerMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            sangTaoPegMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.40 });
            noiQuySangTaoMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            sanPhamStMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            sangTaoCabFrontMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.40 });
            thungRacFrontMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.34 });

            const oakMat = new THREE.MeshStandardMaterial({
                map: createHoneyOakWoodTexture(),
                roughness: 0.44
            });
            const whitePlasticMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.30 });
            const blueRugTex = createShagRugTileTexture('#3b82f6', '#60a5fa', '#2563eb');

            // ========================================================================
            // ZONE 1 (x = -3.66): NEW "GÓC ĐỌC SÁCH" (EXACT MATCH TO image_b9ef5d.jpg)
            // ========================================================================
            const readCenterX = -3.66;

            // 1A. Top Cloud & Rainbow Banner "Góc đọc sách – ⭐ Đọc sách là nuôi dưỡng ước mơ ⭐" (lowered closer to the bookshelf top so there is no excessive wall gap)
            const readBanner = new THREE.Mesh(
                new THREE.PlaneGeometry(1.48, 0.68),
                docSachBannerMaterial
            );
            readBanner.rotation.y = Math.PI;
            readBanner.position.set(readCenterX + 0.14, 1.66, backZ - 0.022);
            scene.add(readBanner);

            // 1B. Left Hanging Yellow-Framed Board "Cùng đọc – Cùng chia sẻ – Cùng học hỏi – Cùng trưởng thành"
            const cungDocGroup = new THREE.Group();
            cungDocGroup.position.set(readCenterX - 0.80, 1.48, backZ - 0.024);
            cungDocGroup.rotation.y = Math.PI;
            const cdFrame = new THREE.Mesh(
                new THREE.BoxGeometry(0.40, 0.56, 0.018),
                new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 })
            );
            const cdFace = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.54), noiQuyDocSachMaterial);
            cdFace.position.z = 0.010;
            cungDocGroup.add(cdFrame, cdFace);
            scene.add(cungDocGroup);

            // 1C. 3-Column × 3-Row Natural Honey-Oak Bookshelf (image_b9ef5d.jpg)
            const bookShelf = new THREE.Group();
            bookShelf.position.set(readCenterX + 0.14, 0, backZ - 0.20);
            bookShelf.rotation.y = Math.PI;

            const bsW = 1.56, bsH = 1.06, bsD = 0.34;
            const bsBody = new THREE.Mesh(new THREE.BoxGeometry(bsW, bsH, bsD), oakMat);
            bsBody.position.y = bsH / 2;
            bsBody.castShadow = true;
            bookShelf.add(bsBody);

            // Ultra-HD Front Face of the 3×3 Bookshelf (Báo, tạp chí & Văn học | Khoa học - STEM | Truyện lịch sử / Danh nhân + 6 Book Covers + 6 Baskets)
            const bsFrontPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(bsW - 0.02, bsH - 0.02),
                docSachShelfFrontMaterial
            );
            bsFrontPlane.position.set(0, bsH / 2, bsD / 2 + 0.002);
            bookShelf.add(bsFrontPlane);

            // 3D Outer Wooden Trim Frame & Dividers protruding slightly for 3D depth
            [-bsW / 2 + 0.016, -bsW / 6, bsW / 6, bsW / 2 - 0.016].forEach((sx) => {
                const vTrim = new THREE.Mesh(new THREE.BoxGeometry(0.024, bsH, 0.022), oakMat);
                vTrim.position.set(sx, bsH / 2, bsD / 2 + 0.008);
                bookShelf.add(vTrim);
            });
            [0.02, 0.34, 0.68, bsH - 0.016].forEach((sy) => {
                const hTrim = new THREE.Mesh(new THREE.BoxGeometry(bsW, 0.024, 0.024), oakMat);
                hTrim.position.set(0, sy, bsD / 2 + 0.008);
                bookShelf.add(hTrim);
            });

            // Items on Top of the Bookshelf (matching image_b9ef5d.jpg):
            // (i) White Pot of Yellow Sunflowers on Left
            const sunflowerPot = new THREE.Group();
            sunflowerPot.position.set(-0.56, bsH, 0.0);
            const sfBowl = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.065, 0.11, 16), whitePlasticMat);
            sfBowl.position.y = 0.055;
            sunflowerPot.add(sfBowl);
            [[-0.04, 0.16, 0.02], [0.04, 0.17, 0.02], [0.0, 0.21, -0.01]].forEach(([fx, fy, fz]) => {
                const sf = createRealisticDaisyBlossom(0xfacc15, 0x78350f, 1.85);
                sf.position.set(fx, fy, fz);
                sunflowerPot.add(sf);
            });
            bookShelf.add(sunflowerPot);

            // (ii) Stack of 3 Colorful Books (Pink, Yellow, Purple)
            [0xa855f7, 0xfacc15, 0xec4899].forEach((col, idx) => {
                const bk = new THREE.Mesh(
                    new THREE.BoxGeometry(0.24, 0.028, 0.17),
                    new THREE.MeshStandardMaterial({ color: col, roughness: 0.45 })
                );
                bk.position.set(-0.22, bsH + 0.014 + idx * 0.029, 0.02);
                bookShelf.add(bk);
            });

            // (iii) 3D Terrestrial Globe ("Quả địa cầu")
            const globeGroup = new THREE.Group();
            globeGroup.position.set(0.32, bsH, 0.02);
            const gBase = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.08, 0.024, 18), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.45 }));
            gBase.position.y = 0.012;
            const gArc = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.008, 10, 24, Math.PI * 1.15), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.4 }));
            gArc.rotation.z = -Math.PI / 2 + 0.25;
            gArc.position.y = 0.15;
            const gSphere = new THREE.Mesh(new THREE.SphereGeometry(0.105, 20, 20), new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.35 }));
            gSphere.position.y = 0.15;
            const contMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.45 });
            [[0.05, 0.17, 0.08], [-0.06, 0.14, 0.07], [0.02, 0.12, -0.09]].forEach(([cx, cy, cz]) => {
                const patch = new THREE.Mesh(new THREE.SphereGeometry(0.042, 10, 10), contMat);
                patch.position.set(cx, cy, cz);
                globeGroup.add(patch);
            });
            globeGroup.add(gBase, gArc, gSphere);
            bookShelf.add(globeGroup);

            // (iv) White Pot with Trailing Green Pothos Vines on Far Right of Bookshelf
            const rightPothos = createPottedPlant(0.095, 0.38, true);
            rightPothos.position.set(0.62, bsH, 0.02);
            bookShelf.add(rightPothos);
            const heartGeo = getRealisticHeartLeafGeometry();
            const vineMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.44, side: THREE.DoubleSide });
            for (let v = 0; v < 14; v++) {
                const vl = new THREE.Mesh(heartGeo, vineMat);
                const s = (1.0 - v * 0.03) * 0.85;
                vl.scale.set(s, s, s);
                vl.position.set(bsW / 2 + 0.02, bsH - v * 0.055, 0.06 + Math.sin(v * 0.9) * 0.04);
                vl.rotation.y = Math.PI / 2;
                bookShelf.add(vl);
            }

            scene.add(bookShelf);

            // 1D. Left Floor Plant in White Ceramic Pot with Rainbow Painted on Front
            const rainbowPlant = createPottedPlant(0.15, 0.78, true);
            rainbowPlant.position.set(readCenterX - 0.82, 0, backZ - 0.24);
            scene.add(rainbowPlant);

            // 1E. Oval Sky-Blue Fluffy Rug + 4 Plump 6-Petal Flower Cushions (Purple, Pink, Yellow, Sky-Blue)
            const readingOvalRug = new THREE.Mesh(
                new THREE.CylinderGeometry(0.86, 0.88, 0.024, 40),
                new THREE.MeshStandardMaterial({ map: blueRugTex, roughness: 0.92 })
            );
            readingOvalRug.scale.set(1.05, 1, 0.56);
            readingOvalRug.position.set(readCenterX + 0.12, 0.012, backZ - 0.72);
            readingOvalRug.receiveShadow = true;
            scene.add(readingOvalRug);

            [
                { dx: -0.54, pCol: 0xa855f7, cCol: 0xfacc15 }, // Purple flower cushion
                { dx: -0.18, pCol: 0xf472b6, cCol: 0xfacc15 }, // Pink flower cushion
                { dx:  0.18, pCol: 0xfacc15, cCol: 0xfefce8 }, // Yellow flower cushion
                { dx:  0.54, pCol: 0x38bdf8, cCol: 0xfde047 }  // Sky-Blue flower cushion
            ].forEach((fc) => {
                const flw = createSixPetalFlowerCushion(fc.pCol, fc.cCol, 0.82);
                flw.position.set(readCenterX + 0.12 + fc.dx, 0.052, backZ - 0.68);
                scene.add(flw);
            });

            // ========================================================================
            // ZONE 2 (x = -1.86): BẢNG ĐỊNH HƯỚNG HÀNH VI ("Em lựa chọn hành vi tích cực")
            // ========================================================================
            const behaviorCenterX = -1.86;
            const behaviorBoard = new THREE.Mesh(
                new THREE.PlaneGeometry(1.52, 1.14),
                hanhViTichCucMaterial
            );
            behaviorBoard.rotation.y = Math.PI;
            behaviorBoard.position.set(behaviorCenterX, 1.46, backZ - 0.022);
            scene.add(behaviorBoard);

            // White Picket-Fence Flower Box below Behavior Board
            const behBoxGroup = new THREE.Group();
            behBoxGroup.position.set(behaviorCenterX, 0, backZ - 0.16);
            const behTrough = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.24, 0.22), whitePlasticMat);
            behTrough.position.y = 0.12;
            behBoxGroup.add(behTrough);
            for (let p = 0; p < 11; p++) {
                const px = -0.52 + (p / 10) * 1.04;
                const picket = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.30, 0.018), whitePlasticMat);
                picket.position.set(px, 0.15, -0.115);
                behBoxGroup.add(picket);
            }
            const broadGeo = getRealisticBroadLeafGeometry();
            const leafMidMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.44, side: THREE.DoubleSide });
            for (let l = 0; l < 16; l++) {
                const lx = -0.50 + (l / 15) * 1.00;
                const blade = new THREE.Mesh(broadGeo, leafMidMat);
                blade.scale.set(0.62, 0.62, 0.62);
                blade.position.set(lx, 0.24, -0.02);
                blade.rotation.x = -0.35;
                behBoxGroup.add(blade);
                if (l % 3 === 1) {
                    const daisy = createRealisticDaisyBlossom(0xf472b6, 0xfacc15, 1.2);
                    daisy.rotation.y = Math.PI;
                    daisy.position.set(lx, 0.34, -0.08);
                    behBoxGroup.add(daisy);
                }
            }
            scene.add(behBoxGroup);

            // ========================================================================
            // ZONE 3 (x = -0.02): "GÓC BÌNH TĨNH" (image_c44d63.jpg)
            // ========================================================================
            const calmCenterX = -0.02;
            const calmBoard = new THREE.Mesh(
                new THREE.PlaneGeometry(2.04, 1.24),
                gocBinhTinhMaterial
            );
            calmBoard.rotation.y = Math.PI;
            // Lowered close to the 0.62m cubby shelf below (bottom edge at y = 0.70m, just 8cm above the shelf!)
            calmBoard.position.set(calmCenterX, 1.32, backZ - 0.022);
            scene.add(calmBoard);

            // Low 3×2 Natural Oak Cubby Shelf under Góc Bình Tĩnh
            const calmShelf = new THREE.Group();
            calmShelf.position.set(calmCenterX, 0, backZ - 0.20);
            calmShelf.rotation.y = Math.PI;
            const csW = 1.18, csH = 0.62, csD = 0.32;
            const csBack = new THREE.Mesh(new THREE.BoxGeometry(csW, csH, 0.02), oakMat);
            csBack.position.set(0, csH / 2, -csD / 2 + 0.01);
            calmShelf.add(csBack);
            [0.025, 0.31, csH - 0.02].forEach((sy) => {
                const b = new THREE.Mesh(new THREE.BoxGeometry(csW, 0.026, csD), oakMat);
                b.position.set(0, sy, 0);
                calmShelf.add(b);
            });
            [-csW / 2 + 0.016, -csW / 6, csW / 6, csW / 2 - 0.016].forEach((sx) => {
                const d = new THREE.Mesh(new THREE.BoxGeometry(0.026, csH, csD), oakMat);
                d.position.set(sx, csH / 2, 0);
                calmShelf.add(d);
            });

            const beadRing = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.022, 12, 24), new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.35 }));
            beadRing.position.set(-0.38, 0.44, 0.02);
            const sensoryBall = new THREE.Mesh(new THREE.SphereGeometry(0.09, 18, 18), new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.35 }));
            sensoryBall.position.set(0.0, 0.44, 0.02);
            const addHourglass = (hx, hy, colHex) => {
                const hg = new THREE.Group();
                hg.position.set(hx, hy, 0.02);
                const hgMat = new THREE.MeshStandardMaterial({ color: colHex, roughness: 0.25 });
                const topBulb = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.085, 14), hgMat);
                topBulb.rotation.x = Math.PI;
                topBulb.position.y = 0.042;
                const botBulb = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.085, 14), hgMat);
                botBulb.position.y = -0.042;
                hg.add(topBulb, botBulb);
                calmShelf.add(hg);
            };
            addHourglass(0.32, 0.44, 0x38bdf8);
            addHourglass(0.44, 0.44, 0xa855f7);
            addHourglass(0.32, 0.16, 0x38bdf8);
            addHourglass(0.44, 0.16, 0xf59e0b);
            calmShelf.add(beadRing, sensoryBall);
            scene.add(calmShelf);

            [-0.80, 0.80].forEach((px) => {
                const p = createPottedPlant(0.13, 0.64, true);
                p.position.set(calmCenterX + px, 0, backZ - 0.22);
                scene.add(p);
            });

            const calmRug = new THREE.Mesh(
                new THREE.CylinderGeometry(0.72, 0.74, 0.024, 36),
                new THREE.MeshStandardMaterial({ map: blueRugTex, roughness: 0.92 })
            );
            calmRug.position.set(calmCenterX, 0.012, backZ - 0.74);
            calmRug.receiveShadow = true;
            scene.add(calmRug);

            const centerPinkFlower = createSixPetalFlowerCushion(0xf472b6, 0xfacc15, 1.15);
            centerPinkFlower.position.set(calmCenterX, 0.062, backZ - 0.72);
            scene.add(centerPinkFlower);

            [
                { x: calmCenterX + 0.44, col: 0xfacc15 },
                { x: calmCenterX - 0.44, col: 0xa3e635 }
            ].forEach((pf) => {
                const pouf = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.15, 0.16, 0.10, 24),
                    new THREE.MeshStandardMaterial({ color: pf.col, roughness: 0.68 })
                );
                pouf.position.set(pf.x, 0.065, backZ - 0.70);
                pouf.castShadow = true;
                scene.add(pouf);
            });

            // ========================================================================
            // ZONE 4 (x = +1.68): "BẢNG TỔNG KẾT THI ĐUA" ON BACK WALL
            // ========================================================================
            const tongKetCenterX = 1.68;
            const tongKetGroup = new THREE.Group();
            tongKetGroup.position.set(tongKetCenterX, 1.38, backZ - 0.024);
            tongKetGroup.rotation.y = Math.PI;

            const tkBacking = new THREE.Mesh(
                new THREE.BoxGeometry(1.26, 0.94, 0.018),
                new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.45 })
            );
            tkBacking.castShadow = true;
            tongKetGroup.add(tkBacking);

            const tkPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(1.24, 0.92),
                bangTongKetMaterial
            );
            tkPlane.position.z = 0.010;
            tongKetGroup.add(tkPlane);
            scene.add(tongKetGroup);

            // ========================================================================
            // ZONE 5 (x = +3.50): "GÓC SÁNG TẠO" BALANCED & SNUG AGAINST THE LOWER CABINET
            // ========================================================================
            const stCenterX = 3.50;

            // 5A. Top Banner "GÓC SÁNG TẠO – Khám phá – Sáng tạo – Chia sẻ" (placed snugly at y = 1.62 right above the pegboard & side boards)
            const stBanner = new THREE.Mesh(
                new THREE.PlaneGeometry(1.54, 0.44),
                sangTaoBannerMaterial
            );
            stBanner.rotation.y = Math.PI;
            stBanner.position.set(stCenterX - 0.02, 1.62, backZ - 0.022);
            scene.add(stBanner);

            // 5B. Left Wall Board on Back Wall: "Nội quy góc sáng tạo" (lowered to y = 1.10, aligned tightly beside the pegboard & right above the tulip box)
            const nqStGroup = new THREE.Group();
            nqStGroup.position.set(stCenterX + 0.80, 1.10, backZ - 0.024);
            nqStGroup.rotation.y = Math.PI;
            const nqStBacking = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.60, 0.020), oakMat);
            const nqStFace = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.58), noiQuySangTaoMaterial);
            nqStFace.position.z = 0.011;
            nqStGroup.add(nqStBacking, nqStFace);
            scene.add(nqStGroup);

            // Wooden Picket-Fence Tulip Planter Box directly below "Nội quy góc sáng tạo"
            const tulipBox = new THREE.Group();
            tulipBox.position.set(stCenterX + 0.80, 0, backZ - 0.16);
            for (let p = 0; p < 6; p++) {
                const px = -0.20 + (p / 5) * 0.40;
                const picket = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.24, 0.022), oakMat);
                picket.position.set(px, 0.12, -0.06);
                tulipBox.add(picket);
            }
            [
                { x: -0.16, col: 0xf472b6, h: 0.34 },
                { x: -0.05, col: 0xfb7185, h: 0.28 },
                { x:  0.06, col: 0xfacc15, h: 0.36 },
                { x:  0.17, col: 0xef4444, h: 0.30 }
            ].forEach((tl) => {
                const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, tl.h, 8), leafMidMat);
                stem.position.set(tl.x, tl.h / 2, -0.02);
                const cup = new THREE.Mesh(
                    new THREE.SphereGeometry(0.042, 12, 12),
                    new THREE.MeshStandardMaterial({ color: tl.col, roughness: 0.38 })
                );
                cup.scale.set(1.0, 1.25, 0.85);
                cup.position.set(tl.x, tl.h + 0.02, -0.02);
                tulipBox.add(stem, cup);
            });
            scene.add(tulipBox);

            // 5C. Center Wall Pegboard (lowered to y = 1.12, bottom edge at 0.87m — right behind the tabletop craft models on the 0.76m cabinet so there is zero empty wall gap!)
            const stPegboard = new THREE.Mesh(
                new THREE.BoxGeometry(1.04, 0.50, 0.024),
                sangTaoPegMaterial
            );
            stPegboard.rotation.y = Math.PI;
            stPegboard.position.set(stCenterX - 0.02, 1.12, backZ - 0.024);
            stPegboard.castShadow = true;
            scene.add(stPegboard);

            // 5D. Right Wall Display on Back Wall: "Sản phẩm của chúng em" (lowered to y = 1.10, aligned symmetrically with Nội quy góc sáng tạo & pegboard)
            const sanPhamBoard = new THREE.Mesh(
                new THREE.PlaneGeometry(0.50, 0.60),
                sanPhamStMaterial
            );
            sanPhamBoard.rotation.y = Math.PI;
            sanPhamBoard.position.set(stCenterX - 0.82, 1.10, backZ - 0.022);
            scene.add(sanPhamBoard);

            // 5E. 2-Tier 4-Column Natural Oak Cabinet raised to cbH = 0.76m (closing the vertical gap with the pegboard & wall displays)
            const stCabinet = new THREE.Group();
            stCabinet.position.set(stCenterX - 0.02, 0, backZ - 0.22);
            stCabinet.rotation.y = Math.PI;

            const cbW = 1.48, cbH = 0.76, cbD = 0.36;
            const cbBody = new THREE.Mesh(new THREE.BoxGeometry(cbW, cbH, cbD), oakMat);
            cbBody.position.y = cbH / 2;
            cbBody.castShadow = true;
            stCabinet.add(cbBody);

            // Ultra-HD Front Face of the 4 Labeled Baskets ("Giấy thủ công", "Bút màu", "Dụng cụ cắt dán", "Vật liệu tái chế") & 4 Lower Rattan Baskets
            const cbFrontPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(cbW - 0.02, cbH - 0.02),
                sangTaoCabFrontMaterial
            );
            cbFrontPlane.position.set(0, cbH / 2, cbD / 2 + 0.002);
            stCabinet.add(cbFrontPlane);

            // 3D Outer Wooden Trim & 4-Column Dividers
            [-cbW / 2 + 0.015, -cbW / 4, 0.0, cbW / 4, cbW / 2 - 0.015].forEach((sx) => {
                const vTrim = new THREE.Mesh(new THREE.BoxGeometry(0.022, cbH, 0.022), oakMat);
                vTrim.position.set(sx, cbH / 2, cbD / 2 + 0.008);
                stCabinet.add(vTrim);
            });
            [0.02, cbH * 0.50, cbH - 0.015].forEach((sy) => {
                const hTrim = new THREE.Mesh(new THREE.BoxGeometry(cbW, 0.022, 0.024), oakMat);
                hTrim.position.set(0, sy, cbD / 2 + 0.008);
                stCabinet.add(hTrim);
            });

            // 8 3D Student Craft Items on Top of the Cabinet (matching image_c3cdfd.jpg):
            // (1) Red-Roofed Wooden House with White Fence (x = -0.58)
            const cHouse = new THREE.Group();
            cHouse.position.set(-0.58, cbH + 0.01, 0.02);
            const chWalls = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.14), new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.45 }));
            chWalls.position.y = 0.07;
            const chRoof = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.11, 4), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 }));
            chRoof.rotation.y = Math.PI / 4;
            chRoof.position.y = 0.19;
            cHouse.add(chWalls, chRoof);
            stCabinet.add(cHouse);

            // (2) Red & White Striped Lighthouse ("Ngọn hải đăng", x = -0.38)
            const lighthouse = new THREE.Group();
            lighthouse.position.set(-0.38, cbH + 0.01, 0.02);
            [0xdc2626, 0xf8fafc, 0xdc2626, 0xf8fafc, 0xdc2626].forEach((col, idx) => {
                const seg = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.036 - idx * 0.003, 0.039 - idx * 0.003, 0.045, 14),
                    new THREE.MeshStandardMaterial({ color: col, roughness: 0.38 })
                );
                seg.position.y = 0.022 + idx * 0.044;
                lighthouse.add(seg);
            });
            const lhRoof = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.045, 14), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.38 }));
            lhRoof.position.y = 0.25;
            lighthouse.add(lhRoof);
            stCabinet.add(lighthouse);

            // (3) Vase of Colorful Daisies (x = -0.21)
            const daisyVase = new THREE.Group();
            daisyVase.position.set(-0.21, cbH + 0.01, 0.02);
            const dvPot = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.032, 0.09, 14), new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.4 }));
            dvPot.position.y = 0.045;
            daisyVase.add(dvPot);
            [[0xf472b6, -0.02, 0.13], [0xfacc15, 0.02, 0.14], [0xa855f7, 0.0, 0.16]].forEach(([col, fx, fy]) => {
                const bl = createRealisticDaisyBlossom(col, 0xfacc15, 1.15);
                bl.position.set(fx, fy, 0.01);
                daisyVase.add(bl);
            });
            stCabinet.add(daisyVase);

            // (4) Yellow Minion Pencil Cup (x = -0.05)
            const minionCup = new THREE.Group();
            minionCup.position.set(-0.05, cbH + 0.01, 0.02);
            const mcYellow = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.09, 16), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.35 }));
            mcYellow.position.y = 0.06;
            const mcBlue = new THREE.Mesh(new THREE.CylinderGeometry(0.043, 0.043, 0.035, 16), new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 }));
            mcBlue.position.y = 0.02;
            minionCup.add(mcYellow, mcBlue);
            stCabinet.add(minionCup);

            // (5) White Bunny Cup with Pink Ears (x = 0.11)
            const bunnyCup = new THREE.Group();
            bunnyCup.position.set(0.11, cbH + 0.01, 0.02);
            const bcBody = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.038, 0.095, 16), whitePlasticMat);
            bcBody.position.y = 0.048;
            [-0.02, 0.02].forEach((ex) => {
                const ear = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.055, 0.008), new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.4 }));
                ear.position.set(ex, 0.115, 0);
                bunnyCup.add(ear);
            });
            bunnyCup.add(bcBody);
            stCabinet.add(bunnyCup);

            // (6) Vase of Paper Pinwheels ("Chong chóng giấy", x = 0.27)
            const pinwheelJar = new THREE.Group();
            pinwheelJar.position.set(0.27, cbH + 0.01, 0.02);
            const pwBase = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.034, 0.09, 14), new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.4 }));
            pwBase.position.y = 0.045;
            const pwWheel1 = new THREE.Mesh(new THREE.CircleGeometry(0.055, 6), new THREE.MeshStandardMaterial({ color: 0xfacc15, side: THREE.DoubleSide }));
            pwWheel1.position.set(-0.02, 0.16, 0.01);
            const pwWheel2 = new THREE.Mesh(new THREE.CircleGeometry(0.055, 6), new THREE.MeshStandardMaterial({ color: 0xec4899, side: THREE.DoubleSide }));
            pwWheel2.position.set(0.03, 0.15, 0.02);
            pinwheelJar.add(pwBase, pwWheel1, pwWheel2);
            stCabinet.add(pinwheelJar);

            // (7) Mini Wooden Easel with Cherry Blossom Painting (x = 0.45)
            const easelGrp = new THREE.Group();
            easelGrp.position.set(0.45, cbH + 0.01, 0.02);
            const easelFrame = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.15, 0.016), oakMat);
            easelFrame.position.y = 0.10;
            easelFrame.rotation.x = -0.12;
            const easelArt = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.12), new THREE.MeshStandardMaterial({ color: 0xfce7f3, roughness: 0.4 }));
            easelArt.position.set(0, 0.10, 0.010);
            easelArt.rotation.x = -0.12;
            easelGrp.add(easelFrame, easelArt);
            stCabinet.add(easelGrp);

            // (8) Green Dinosaur Model (x = 0.62)
            const dinoGrp = new THREE.Group();
            dinoGrp.position.set(0.62, cbH + 0.01, 0.02);
            const dinoMat = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.42 });
            const dBody = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.05), dinoMat);
            dBody.position.y = 0.045;
            const dHead = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.05), dinoMat);
            dHead.position.set(-0.02, 0.105, 0);
            dinoGrp.add(dBody, dHead);
            stCabinet.add(dinoGrp);

            scene.add(stCabinet);

            // White Ceramic Potted Green Plant to the Right of the Cabinet (x = stCenterX - 0.88)
            const stSidePlant = createPottedPlant(0.13, 0.64, true);
            stSidePlant.position.set(stCenterX - 0.88, 0, backZ - 0.22);
            scene.add(stSidePlant);

            // ========================================================================
            // ZONE 6: GREEN CLASSROOM TRASH BIN ("Thùng rác" - image-gen-2(7).png)
            // Placed at the Left Corner on the Corridor/Door Wall facing toward the Entrance Door & Classroom (matching image_b9e855.png)
            // ========================================================================
            const trashGroup = new THREE.Group();
            trashGroup.position.set(rightX - 0.30, 0, 3.68);
            trashGroup.rotation.y = -Math.PI * 0.62; // Angled toward the classroom & entrance doorway

            const binGreenMat = new THREE.MeshStandardMaterial({ color: 0x40b81b, roughness: 0.30, metalness: 0.05 });
            const binDarkGreenMat = new THREE.MeshStandardMaterial({ color: 0x2d8a12, roughness: 0.38 });

            const binBody = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.62, 0.36), binGreenMat);
            binBody.position.y = 0.33;
            binBody.castShadow = true;
            trashGroup.add(binBody);

            const binRim = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.055, 0.39), binGreenMat);
            binRim.position.y = 0.65;
            const binHood = new THREE.Mesh(new THREE.BoxGeometry(0.41, 0.08, 0.35), binGreenMat);
            binHood.position.y = 0.71;
            const binOpening = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.18), binDarkGreenMat);
            binOpening.rotation.x = -Math.PI / 2;
            binOpening.position.set(0, 0.752, 0.02);
            trashGroup.add(binRim, binHood, binOpening);

            const binFrontLabel = new THREE.Mesh(
                new THREE.PlaneGeometry(0.32, 0.38),
                thungRacFrontMaterial
            );
            binFrontLabel.position.set(0, 0.36, 0.182);
            trashGroup.add(binFrontLabel);

            scene.add(trashGroup);

            // ========================================================================
            // RIGHT OF GÓC ĐỌC SÁCH ON LEFT WALL (-X):
            // 1. "HỘP THƯ Ý KIẾN CỦA EM" (image_b902ff.jpg) at z = +3.48
            // 2. "GÓC SINH NHẬT" (image_b902e1.jpg) right beside it at z = +1.42
            // ========================================================================
            hopThuBoxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.05 });
            hopThuTrayMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            gocSinhNhatMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38 });
            hopThuDieuUocMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.36 });
            chauCaySinhNhatMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.32 });

            // --- A. 3D "HỘP THƯ Ý KIẾN CỦA EM" + 5-COMPARTMENT WOODEN NOTE TRAY (z = +3.48) ---
            const hopThuCenterZ = 3.48;
            const hopThuGroup = new THREE.Group();
            hopThuGroup.position.set(leftX + 0.022, 0, hopThuCenterZ);
            hopThuGroup.rotation.y = Math.PI / 2; // Facing +X into the classroom

            // A1. Upper 3D Clear Acrylic Wall Box ("Hộp thư Ý kiến của em")
            const acBoxW = 0.62, acBoxH = 0.44, acBoxD = 0.12;
            const acrylicGlassMat = new THREE.MeshStandardMaterial({
                color: 0xe0f2fe,
                transparent: true,
                opacity: 0.42,
                roughness: 0.12,
                metalness: 0.15
            });
            const acShell = new THREE.Mesh(new THREE.BoxGeometry(acBoxW, acBoxH, acBoxD), acrylicGlassMat);
            acShell.position.set(0, 2.02, acBoxD / 2);
            acShell.castShadow = true;
            hopThuGroup.add(acShell);

            const acFrontFace = new THREE.Mesh(
                new THREE.PlaneGeometry(acBoxW - 0.01, acBoxH - 0.01),
                hopThuBoxMaterial
            );
            acFrontFace.position.set(0, 2.02, acBoxD + 0.002);
            hopThuGroup.add(acFrontFace);

            [-0.16, 0.16].forEach((hx) => {
                const hinge = new THREE.Mesh(
                    new THREE.BoxGeometry(0.08, 0.028, 0.045),
                    new THREE.MeshStandardMaterial({ color: 0xf8fafc, transparent: true, opacity: 0.75, roughness: 0.2 })
                );
                hinge.position.set(hx, 2.02 + acBoxH / 2 + 0.008, acBoxD * 0.55);
                hopThuGroup.add(hinge);
            });
            const acSlot = new THREE.Mesh(
                new THREE.PlaneGeometry(0.32, 0.016),
                new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 })
            );
            acSlot.rotation.x = -Math.PI / 2;
            acSlot.position.set(0, 2.02 + acBoxH / 2 + 0.002, acBoxD * 0.5);
            hopThuGroup.add(acSlot);

            const silverKeyMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.2 });
            const lockCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.016, 16), silverKeyMat);
            lockCyl.rotation.x = Math.PI / 2;
            lockCyl.position.set(-0.015, 1.84, acBoxD + 0.008);
            const keyShaft = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.055, 0.006), silverKeyMat);
            keyShaft.position.set(-0.015, 1.795, acBoxD + 0.014);
            hopThuGroup.add(lockCyl, keyShaft);

            // A2. Lower 3D 5-Compartment Natural Honey-Oak Note Tray ("Hồng: Yêu thương | Vàng: Sáng kiến | Xanh lá: Tâm sự | Xanh dương: Hỏi đáp | Tím nhạt: Tự do")
            const trayW = 0.94, trayH = 0.24, trayD = 0.15;
            const trayY = 1.48;
            const trayBack = new THREE.Mesh(new THREE.BoxGeometry(trayW, trayH, 0.018), oakMat);
            trayBack.position.set(0, trayY, 0.009);
            const trayBot = new THREE.Mesh(new THREE.BoxGeometry(trayW, 0.020, trayD), oakMat);
            trayBot.position.set(0, trayY - trayH / 2 + 0.010, trayD / 2);
            hopThuGroup.add(trayBack, trayBot);

            for (let d = 0; d < 6; d++) {
                const dx = -trayW / 2 + 0.010 + d * ((trayW - 0.12) / 5);
                const divW = new THREE.Mesh(new THREE.BoxGeometry(0.016, trayH * 0.86, trayD * 0.92), oakMat);
                divW.position.set(dx, trayY - 0.012, trayD * 0.46);
                hopThuGroup.add(divW);
            }
            const rightEndWall = new THREE.Mesh(new THREE.BoxGeometry(0.018, trayH, trayD), oakMat);
            rightEndWall.position.set(trayW / 2 - 0.009, trayY, trayD / 2);
            hopThuGroup.add(rightEndWall);

            [0xf472b6, 0xfacc15, 0x84cc16, 0x38bdf8, 0xc084fc].forEach((nCol, idx) => {
                const nx = -trayW / 2 + 0.088 + idx * 0.162;
                const notePad = new THREE.Mesh(
                    new THREE.BoxGeometry(0.125, 0.036, 0.115),
                    new THREE.MeshStandardMaterial({ color: nCol, roughness: 0.42 })
                );
                notePad.rotation.x = 0.22;
                notePad.position.set(nx, trayY - 0.045, trayD * 0.54);
                hopThuGroup.add(notePad);
            });

            const trayFrontPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(trayW, trayH),
                hopThuTrayMaterial
            );
            trayFrontPlane.position.set(0, trayY, trayD + 0.002);
            hopThuGroup.add(trayFrontPlane);

            const penCupGrp = new THREE.Group();
            penCupGrp.position.set(trayW / 2 - 0.068, trayY - trayH / 2 + 0.02, trayD * 0.55);
            const cupBody = new THREE.Mesh(
                new THREE.CylinderGeometry(0.042, 0.036, 0.13, 16),
                new THREE.MeshStandardMaterial({ color: 0xf1f5f9, transparent: true, opacity: 0.65, roughness: 0.2 })
            );
            cupBody.position.y = 0.065;
            penCupGrp.add(cupBody);
            [
                { col: 0x2563eb, dx: -0.018, dz:  0.008, rz:  0.14 },
                { col: 0x1e293b, dx: -0.006, dz: -0.010, rz:  0.06 },
                { col: 0xef4444, dx:  0.008, dz: -0.008, rz: -0.04 },
                { col: 0xfacc15, dx:  0.016, dz:  0.010, rz: -0.12 },
                { col: 0x16a34a, dx:  0.022, dz:  0.002, rz: -0.16 }
            ].forEach((p) => {
                const pen = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.005, 0.005, 0.19, 10),
                    new THREE.MeshStandardMaterial({ color: p.col, roughness: 0.35 })
                );
                pen.position.set(p.dx, 0.11, p.dz);
                pen.rotation.z = p.rz;
                penCupGrp.add(pen);
            });
            hopThuGroup.add(penCupGrp);

            scene.add(hopThuGroup);

            // --- B. 3D "GÓC SINH NHẬT" (image_b902e1.jpg) RIGHT BESIDE HỘP THƯ Ý KIẾN AT z = +1.42 ---
            const sinhNhatCenterZ = 1.42;
            const sinhNhatGroup = new THREE.Group();
            sinhNhatGroup.position.set(leftX + 0.022, 0, sinhNhatCenterZ);
            sinhNhatGroup.rotation.y = Math.PI / 2; // Facing +X into the classroom

            const snW = 2.66, snH = 2.02;
            const snWallBoard = new THREE.Mesh(
                new THREE.PlaneGeometry(snW, snH),
                gocSinhNhatMaterial
            );
            snWallBoard.position.set(0, 1.46, 0.004);
            sinhNhatGroup.add(snWallBoard);

            // 3D Pink "Hộp thư điều ước" (Wish Mailbox) standing on the floor in front of Góc Sinh Nhật
            const wishBoxW = 0.56, wishBoxH = 0.48, wishBoxD = 0.28;
            const wishBoxGroup = new THREE.Group();
            wishBoxGroup.position.set(-0.06, 0, 0.16);

            const pinkBoxMat = new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.38 });
            const wishBoxBody = new THREE.Mesh(
                new THREE.BoxGeometry(wishBoxW, wishBoxH, wishBoxD),
                pinkBoxMat
            );
            wishBoxBody.position.y = wishBoxH / 2;
            wishBoxBody.castShadow = true;
            wishBoxGroup.add(wishBoxBody);

            const wishBoxFront = new THREE.Mesh(
                new THREE.PlaneGeometry(wishBoxW - 0.01, wishBoxH - 0.01),
                hopThuDieuUocMaterial
            );
            wishBoxFront.position.set(0, wishBoxH / 2, wishBoxD / 2 + 0.002);
            wishBoxGroup.add(wishBoxFront);

            const wishSlot = new THREE.Mesh(
                new THREE.PlaneGeometry(0.24, 0.022),
                new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.7 })
            );
            wishSlot.rotation.x = -Math.PI / 2;
            wishSlot.position.set(0, wishBoxH + 0.002, 0);
            wishBoxGroup.add(wishSlot);

            sinhNhatGroup.add(wishBoxGroup);

            // 3D Cute Winking White Planter Pot ("😉 ❤️") with Lush Variegated Green Leaves on the Left of Góc Sinh Nhật
            const snPlantGroup = createPottedPlant(0.15, 0.72, true);
            snPlantGroup.position.set(-1.02, 0, 0.18);
            const cutePotFace = new THREE.Mesh(
                new THREE.PlaneGeometry(0.24, 0.21),
                chauCaySinhNhatMaterial
            );
            cutePotFace.position.set(0, 0.15, 0.155);
            snPlantGroup.add(cutePotFace);
            sinhNhatGroup.add(snPlantGroup);

            // 3D Blue & Pink Birthday Gift Boxes at the Base of the Birthday Wish Tree (Right side)
            const blueGift = new THREE.Mesh(
                new THREE.BoxGeometry(0.24, 0.22, 0.18),
                new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.4 })
            );
            blueGift.position.set(0.62, 0.14, 0.10);
            blueGift.castShadow = true;
            const pinkGift = new THREE.Mesh(
                new THREE.BoxGeometry(0.24, 0.20, 0.20),
                new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 })
            );
            pinkGift.position.set(0.82, 0.11, 0.14);
            pinkGift.castShadow = true;
            sinhNhatGroup.add(blueGift, pinkGift);

            scene.add(sinhNhatGroup);

            // ========================================================================
            // 4 LUSH HANGING GREEN PLANTS ALONG THE TOP OF THE BACK WALL (image_c45100.jpg)
            // ========================================================================
            [-4.52, -1.16, 1.12, 4.48].forEach((hx) => {
                const hp = createRealisticRibbedHangingBasket(0.38);
                hp.position.set(hx, 3.12, backZ - 0.18);
                scene.add(hp);
            });
        }

        // ============================================================================
        // REALISTIC 3D BOTANICAL LEAF, FLOWER & PLANTER GEOMETRY ENGINE
        // ============================================================================
        let _cachedHeartLeafGeo = null;
        let _cachedLanceLeafGeo = null;

        function getRealisticHeartLeafGeometry() {
            if (_cachedHeartLeafGeo) return _cachedHeartLeafGeo;
            const shape = new THREE.Shape();
            // Heart-shaped Pothos leaf blade: notched base, wide rounded lobes, acuminate tip
            shape.moveTo(0, 0.015);
            shape.bezierCurveTo(0.018, 0.038, 0.052, 0.028, 0.048, -0.008);
            shape.bezierCurveTo(0.044, -0.042, 0.018, -0.068, 0, -0.095);
            shape.bezierCurveTo(-0.018, -0.068, -0.044, -0.042, -0.048, -0.008);
            shape.bezierCurveTo(-0.052, 0.028, -0.018, 0.038, 0, 0.015);

            const geo = new THREE.ShapeGeometry(shape, 10);
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const vx = pos.getX(i);
                const vy = pos.getY(i);
                // Natural arch along the length of the leaf + slight V-fold along the midrib
                const archZ = -Math.pow(vy * 8.5, 2) * 0.012 + Math.abs(vx) * 0.12;
                pos.setZ(i, archZ);
            }
            geo.computeVertexNormals();
            _cachedHeartLeafGeo = geo;
            return geo;
        }

        function getRealisticBroadLeafGeometry() {
            if (_cachedLanceLeafGeo) return _cachedLanceLeafGeo;
            const shape = new THREE.Shape();
            // Pointed tropical leaf blade (Dieffenbachia / Peace Lily / Garden shrub leaf)
            shape.moveTo(0, 0);
            shape.bezierCurveTo(0.026, 0.04, 0.042, 0.11, 0.028, 0.19);
            shape.bezierCurveTo(0.016, 0.24, 0.005, 0.27, 0, 0.29);
            shape.bezierCurveTo(-0.005, 0.27, -0.016, 0.24, -0.028, 0.19);
            shape.bezierCurveTo(-0.042, 0.11, -0.026, 0.04, 0, 0);

            const geo = new THREE.ShapeGeometry(shape, 10);
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const vx = pos.getX(i);
                const vy = pos.getY(i);
                // Graceful outward curve as the leaf rises
                const curveZ = Math.pow(vy / 0.29, 1.8) * 0.075 - Math.abs(vx) * 0.18;
                pos.setZ(i, curveZ);
            }
            geo.computeVertexNormals();
            _cachedLanceLeafGeo = geo;
            return geo;
        }

        function createRealisticDaisyBlossom(petalHex = 0xf472b6, centerHex = 0xf59e0b, scale = 1.0) {
            const flower = new THREE.Group();
            const petalMat = new THREE.MeshStandardMaterial({
                color: petalHex,
                roughness: 0.42,
                side: THREE.DoubleSide
            });
            const centerMat = new THREE.MeshStandardMaterial({
                color: centerHex,
                roughness: 0.5
            });

            const numPetals = 8;
            for (let p = 0; p < numPetals; p++) {
                const ang = (p / numPetals) * Math.PI * 2;
                const petal = new THREE.Mesh(
                    new THREE.CircleGeometry(0.016 * scale, 10),
                    petalMat
                );
                petal.scale.set(1.45, 0.62, 1.0);
                petal.position.set(
                    Math.cos(ang) * 0.019 * scale,
                    Math.sin(ang) * 0.019 * scale,
                    0.002 * scale
                );
                petal.rotation.z = ang;
                petal.rotation.y = -0.18;
                flower.add(petal);
            }

            const stamenCenter = new THREE.Mesh(
                new THREE.SphereGeometry(0.011 * scale, 10, 10),
                centerMat
            );
            stamenCenter.scale.set(1.0, 1.0, 0.55);
            stamenCenter.position.z = 0.004 * scale;
            flower.add(stamenCenter);

            return flower;
        }

        function createPottedPlant(potRadius = 0.13, height = 0.6, variegated = false) {
            const group = new THREE.Group();
            const potH = height * 0.44;
            const ceramicMat = new THREE.MeshStandardMaterial({
                color: 0xf8f6f0,
                roughness: 0.32,
                metalness: 0.04
            });
            const ribMat = new THREE.MeshStandardMaterial({
                color: 0xede8dc,
                roughness: 0.38
            });

            // 1. LatheGeometry Tapered Ceramic Planter Pot with Rolled Rim
            const pts = [
                new THREE.Vector2(0.0, 0.012),
                new THREE.Vector2(potRadius * 0.72, 0.012),
                new THREE.Vector2(potRadius * 0.80, potH * 0.35),
                new THREE.Vector2(potRadius * 0.94, potH * 0.88),
                new THREE.Vector2(potRadius * 1.03, potH * 0.94),
                new THREE.Vector2(potRadius * 1.03, potH),
                new THREE.Vector2(potRadius * 0.88, potH),
                new THREE.Vector2(potRadius * 0.84, potH * 0.86)
            ];
            const potMesh = new THREE.Mesh(new THREE.LatheGeometry(pts, 24), ceramicMat);
            potMesh.castShadow = true;
            potMesh.receiveShadow = true;
            group.add(potMesh);

            // Vertical Fluted Ribs around the Ceramic Pot
            for (let r = 0; r < 18; r++) {
                const ang = (r / 18) * Math.PI * 2;
                const rib = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.005, 0.004, potH * 0.78, 6),
                    ribMat
                );
                const rad = potRadius * 0.86;
                rib.position.set(Math.cos(ang) * rad, potH * 0.48, Math.sin(ang) * rad);
                rib.rotation.z = -Math.cos(ang) * 0.14;
                rib.rotation.x = -Math.sin(ang) * 0.14;
                group.add(rib);
            }

            // Matching Ceramic Drainage Saucer at Base
            const saucer = new THREE.Mesh(
                new THREE.CylinderGeometry(potRadius * 0.88, potRadius * 0.80, 0.024, 24),
                ceramicMat
            );
            saucer.position.y = 0.012;
            group.add(saucer);

            // Dark Earthy Potting Soil Disc
            const soil = new THREE.Mesh(
                new THREE.CylinderGeometry(potRadius * 0.86, potRadius * 0.82, 0.02, 20),
                new THREE.MeshStandardMaterial({ color: 0x3b2614, roughness: 0.92 })
            );
            soil.position.y = potH * 0.89;
            group.add(soil);

            // 2. Realistic 3D Curved Tropical Leaf Blades radiating in 3 tiers
            const leafGeo = getRealisticBroadLeafGeometry();
            const outerLeafMat = new THREE.MeshStandardMaterial({
                color: variegated ? 0x22c55e : 0x15803d,
                roughness: 0.44,
                side: THREE.DoubleSide
            });
            const midLeafMat = new THREE.MeshStandardMaterial({
                color: variegated ? 0x84cc16 : 0x16a34a,
                roughness: 0.42,
                side: THREE.DoubleSide
            });
            const innerVeinMat = new THREE.MeshStandardMaterial({
                color: variegated ? 0xd9f99d : 0x4ade80,
                roughness: 0.40,
                side: THREE.DoubleSide
            });
            const stemMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.55 });

            const tiers = [
                { count: 8, tilt: 0.62, yBase: potH * 0.88, scale: height * 1.45, mat: outerLeafMat },
                { count: 7, tilt: 0.38, yBase: potH * 0.91, scale: height * 1.32, mat: midLeafMat },
                { count: 5, tilt: 0.18, yBase: potH * 0.94, scale: height * 1.15, mat: innerVeinMat }
            ];

            tiers.forEach((tier, tIdx) => {
                for (let i = 0; i < tier.count; i++) {
                    const ang = (i / tier.count) * Math.PI * 2 + tIdx * 0.45;
                    const leafPivot = new THREE.Group();
                    leafPivot.position.set(
                        Math.cos(ang) * (potRadius * 0.18 * (3 - tIdx)),
                        tier.yBase,
                        Math.sin(ang) * (potRadius * 0.18 * (3 - tIdx))
                    );
                    leafPivot.rotation.y = -ang + Math.PI / 2;
                    leafPivot.rotation.x = tier.tilt;

                    // Petiole stem
                    const petiole = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.004, 0.006, 0.07 * tier.scale, 6),
                        stemMat
                    );
                    petiole.position.y = 0.035 * tier.scale;
                    leafPivot.add(petiole);

                    // Main leaf blade
                    const blade = new THREE.Mesh(leafGeo, tier.mat);
                    blade.scale.set(tier.scale, tier.scale, tier.scale);
                    blade.position.y = 0.04 * tier.scale;
                    blade.castShadow = true;
                    leafPivot.add(blade);

                    // Variegated lighter center stripe for variegated plants
                    if (variegated) {
                        const centerStripe = new THREE.Mesh(leafGeo, innerVeinMat);
                        centerStripe.scale.set(tier.scale * 0.45, tier.scale * 0.88, tier.scale);
                        centerStripe.position.set(0, 0.05 * tier.scale, 0.002);
                        leafPivot.add(centerStripe);
                    }

                    group.add(leafPivot);
                }
            });

            return group;
        }

        function createRealisticRibbedHangingBasket(hasPinkFlowers = false) {
            const hangGroup = new THREE.Group();

            const hookWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
            const ropeTanMat = new THREE.MeshStandardMaterial({ color: 0xd9b37c, roughness: 0.78 });
            const bowlCreamMat = new THREE.MeshStandardMaterial({
                color: 0xf6eedc,
                roughness: 0.36,
                metalness: 0.03
            });
            const bowlRibMat = new THREE.MeshStandardMaterial({
                color: 0xe8dec5,
                roughness: 0.42
            });

            // 1. White Oval Wall Hook with Metal Pin
            const hookPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.012, 16), hookWhiteMat);
            hookPlate.rotation.z = Math.PI / 2;
            hookPlate.scale.set(1.45, 1.0, 0.9);
            hookPlate.position.set(-0.02, 0.01, 0);
            hangGroup.add(hookPlate);

            const hookPin = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.0045, 8, 16, Math.PI * 1.3), hookWhiteMat);
            hookPin.rotation.y = Math.PI / 2;
            hookPin.position.set(-0.005, 0.0, 0);
            hangGroup.add(hookPin);

            // 2. Curved Ribbed Bowl Planter (LatheGeometry) at y = -0.34
            const bowlY = -0.35;
            const bowlR = 0.132;
            const bowlH = 0.155;
            const lathePts = [
                new THREE.Vector2(0.0, 0.0),
                new THREE.Vector2(bowlR * 0.56, 0.0),
                new THREE.Vector2(bowlR * 0.62, 0.018),
                new THREE.Vector2(bowlR * 0.88, bowlH * 0.42),
                new THREE.Vector2(bowlR * 1.00, bowlH * 0.82),
                new THREE.Vector2(bowlR * 1.06, bowlH * 0.90),
                new THREE.Vector2(bowlR * 1.06, bowlH),
                new THREE.Vector2(bowlR * 0.92, bowlH),
                new THREE.Vector2(bowlR * 0.88, bowlH * 0.85)
            ];
            const bowlMesh = new THREE.Mesh(new THREE.LatheGeometry(lathePts, 28), bowlCreamMat);
            bowlMesh.position.set(0.015, bowlY - bowlH / 2, 0);
            bowlMesh.castShadow = true;
            bowlMesh.receiveShadow = true;
            hangGroup.add(bowlMesh);

            // 22 Vertical Ribs on the Cream Bowl
            for (let r = 0; r < 22; r++) {
                const ang = (r / 22) * Math.PI * 2;
                const rib = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.0045, 0.003, bowlH * 0.68, 6),
                    bowlRibMat
                );
                const rad = bowlR * 0.93;
                rib.position.set(
                    0.015 + Math.cos(ang) * rad,
                    bowlY - bowlH * 0.04,
                    Math.sin(ang) * rad
                );
                rib.rotation.z = -Math.cos(ang) * 0.24;
                rib.rotation.x = -Math.sin(ang) * 0.24;
                hangGroup.add(rib);
            }

            // Dark Potting Soil inside Bowl
            const soil = new THREE.Mesh(
                new THREE.CylinderGeometry(bowlR * 0.92, bowlR * 0.86, 0.02, 20),
                new THREE.MeshStandardMaterial({ color: 0x3b2514, roughness: 0.9 })
            );
            soil.position.set(0.015, bowlY + bowlH * 0.38, 0);
            hangGroup.add(soil);

            // 3. Three Twisted Golden-Tan Macramé Ropes connecting Hook (0, 0.01, 0) to Bowl Rim
            const topApex = new THREE.Vector3(-0.005, 0.005, 0);
            [
                new THREE.Vector3(0.015 - bowlR * 0.55, bowlY + bowlH * 0.46, -bowlR * 0.82),
                new THREE.Vector3(0.015 + bowlR * 0.96, bowlY + bowlH * 0.46, 0.0),
                new THREE.Vector3(0.015 - bowlR * 0.55, bowlY + bowlH * 0.46, bowlR * 0.82)
            ].forEach((rimPt) => {
                const dir = new THREE.Vector3().subVectors(rimPt, topApex);
                const len = dir.length();
                const rope = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.0048, 0.0048, len, 8),
                    ropeTanMat
                );
                rope.position.copy(topApex).addScaledVector(dir, 0.5);
                rope.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
                hangGroup.add(rope);
            });

            // 4. Lush Crown of 3D Heart-Shaped Golden Pothos Leaves overflowing the Bowl Rim
            const heartLeafGeo = getRealisticHeartLeafGeometry();
            const limeMat = new THREE.MeshStandardMaterial({ color: 0xa3e635, roughness: 0.42, side: THREE.DoubleSide });
            const brightGreenMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.44, side: THREE.DoubleSide });
            const midGreenMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.45, side: THREE.DoubleSide });
            const deepGreenMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.48, side: THREE.DoubleSide });
            const leafMats = [limeMat, brightGreenMat, midGreenMat, deepGreenMat];
            const vineStemMat = new THREE.MeshStandardMaterial({ color: 0x3f8f29, roughness: 0.55 });

            for (let c = 0; c < 36; c++) {
                const ring = Math.floor(c / 12); // 0: inner top, 1: mid crown, 2: overflowing rim
                const ang = ((c % 12) / 12) * Math.PI * 2 + ring * 0.28;
                const rad = 0.035 + ring * 0.048;
                const ly = bowlY + bowlH * 0.48 + (2 - ring) * 0.032 + (c % 3) * 0.014;

                const leafMesh = new THREE.Mesh(heartLeafGeo, leafMats[(c + ring) % leafMats.length]);
                const s = 0.85 + (c % 3) * 0.14;
                leafMesh.scale.set(s, s, s);
                leafMesh.position.set(
                    0.015 + Math.cos(ang) * rad,
                    ly,
                    Math.sin(ang) * rad
                );
                leafMesh.rotation.y = -ang + Math.PI / 2;
                leafMesh.rotation.x = 0.35 + ring * 0.38;
                leafMesh.rotation.z = ((c % 2 === 0) ? 1 : -1) * 0.18;
                leafMesh.castShadow = true;
                hangGroup.add(leafMesh);
            }

            // 5. Continuous Curved 3D Vine Stems with Alternating Heart-Shaped Leaves
            const vineSpecs = [
                { zOff: -0.115, xOff: 0.05, len: 0.36, leaves: 7 },
                { zOff: -0.055, xOff: 0.085, len: 0.48, leaves: 9 },
                { zOff:  0.008, xOff: 0.095, len: 0.30, leaves: 6 },
                { zOff:  0.062, xOff: 0.082, len: 0.44, leaves: 8 },
                { zOff:  0.118, xOff: 0.045, len: 0.34, leaves: 7 }
            ];

            vineSpecs.forEach((v, vIdx) => {
                const startY = bowlY + bowlH * 0.36;
                const curvePts = [];
                for (let s = 0; s <= 4; s++) {
                    const t = s / 4;
                    curvePts.push(new THREE.Vector3(
                        v.xOff + Math.sin(t * Math.PI * 1.5 + vIdx) * 0.016,
                        startY - t * v.len,
                        v.zOff + Math.cos(t * Math.PI * 2.0 + vIdx) * 0.018
                    ));
                }
                const curve = new THREE.CatmullRomCurve3(curvePts);
                const stemMesh = new THREE.Mesh(
                    new THREE.TubeGeometry(curve, 14, 0.0038, 6, false),
                    vineStemMat
                );
                hangGroup.add(stemMesh);

                for (let k = 0; k < v.leaves; k++) {
                    const t = (k + 0.4) / v.leaves;
                    const pt = curve.getPoint(t);
                    const vLeaf = new THREE.Mesh(heartLeafGeo, leafMats[(k + vIdx) % leafMats.length]);
                    const scale = (1.0 - t * 0.38) * 0.88;
                    vLeaf.scale.set(scale, scale, scale);
                    vLeaf.position.set(
                        pt.x + 0.012,
                        pt.y,
                        pt.z + (k % 2 === 0 ? -0.014 : 0.014)
                    );
                    vLeaf.rotation.y = Math.PI / 2 + (k % 2 === 0 ? -0.28 : 0.28);
                    vLeaf.rotation.x = 0.22;
                    vLeaf.castShadow = true;
                    hangGroup.add(vLeaf);
                }
            });

            // 6. Blooming Pink 8-Petal Cosmos Flowers on the Middle Hanging Pot
            if (hasPinkFlowers) {
                const blossomPositions = [
                    [0.06, -0.18, -0.08], [0.09, -0.20, -0.02], [0.07, -0.17, 0.05],
                    [0.05, -0.22, 0.10],  [0.10, -0.25, -0.06], [0.11, -0.24, 0.03],
                    [0.08, -0.28, -0.11], [0.09, -0.28, 0.09],  [0.04, -0.15, 0.0],
                    [0.07, -0.21, -0.13], [0.07, -0.20, 0.13],  [0.10, -0.27, -0.01]
                ];
                blossomPositions.forEach(([fx, fy, fz], bIdx) => {
                    const pHex = bIdx % 2 === 0 ? 0xf472b6 : 0xf9a8d4;
                    const flower = createRealisticDaisyBlossom(pHex, 0xf59e0b, 1.05);
                    flower.position.set(fx, fy, fz);
                    flower.rotation.y = Math.PI / 2 + (fz * 2.2);
                    flower.rotation.x = -0.25;
                    hangGroup.add(flower);
                });
            }

            return hangGroup;
        }

        // ============================================================================
        // RIGHT WALL & CORRIDOR IN FRONT OF CLASSROOM 5A ("HÀNH LANG LỚP HỌC HẠNH PHÚC")
        // ============================================================================
        function createBlueDoorFallbackTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 340;
            canvas.height = 840;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#017bd2';
            ctx.fillRect(0, 0, 340, 840);
            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            return tex;
        }

        function buildRightWallDoor5A() {
            const wallSurfaceX = ROOM_W / 2 + 0.14; // Exterior face of the +X wall (x = 4.94)
            const doorCenterZ = -2.60;

            const frameBlueMat = new THREE.MeshStandardMaterial({
                color: 0x4a89c8,
                roughness: 0.36,
                metalness: 0.08
            });
            const leafBlueMat = new THREE.MeshStandardMaterial({
                color: 0x017bd2,
                roughness: 0.38,
                metalness: 0.06
            });
            const winBlueMat = new THREE.MeshStandardMaterial({
                color: 0x5c97cf,
                roughness: 0.38,
                metalness: 0.06
            });
            const silverMetalMat = new THREE.MeshStandardMaterial({
                color: 0xe2e8f0,
                metalness: 0.86,
                roughness: 0.22
            });
            const glassPaneMat = new THREE.MeshStandardMaterial({
                color: 0xcfe8f7,
                transparent: true,
                opacity: 0.34,
                roughness: 0.15,
                metalness: 0.1
            });
            const keyholeDarkMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });

            blueDoorLeafMaterial = new THREE.MeshStandardMaterial({
                map: createBlueDoorFallbackTexture(),
                roughness: 0.35,
                metalness: 0.05
            });
            happyDoorLeafMaterial = new THREE.MeshStandardMaterial({
                map: createBlueDoorFallbackTexture(),
                roughness: 0.36,
                metalness: 0.04
            });
            happyDoorTulipMaterial = new THREE.MeshStandardMaterial({
                map: createBlueDoorFallbackTexture(),
                roughness: 0.36,
                metalness: 0.04
            });
            lop5ASignMaterial = new THREE.MeshStandardMaterial({
                map: createClass5ASignTexture(),
                roughness: 0.4
            });
            gocXanhBoardMaterial = new THREE.MeshStandardMaterial({
                map: createClass5ASignTexture(),
                roughness: 0.4
            });
            winFlowerBoxMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.5
            });
            grassFlowersBorderMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                roughness: 0.5
            });

            // ========================================================================
            // A. CONNECTED 2-LEAF BLUE CLASSROOM DOOR ("2 CỬA NỐI LIỀN") + TRANSOM
            // ========================================================================
            const doorGroup = new THREE.Group();
            doorGroup.position.set(ROOM_W / 2 + 0.07, 0, doorCenterZ);

            const totalDoorW = 1.60;
            const doorFrameH = 2.22;
            const transomH = 0.46;
            const frameDepth = 0.165;
            const jambThick = 0.05;

            const leftOuterJamb = new THREE.Mesh(
                new THREE.BoxGeometry(frameDepth, doorFrameH + transomH, jambThick),
                frameBlueMat
            );
            leftOuterJamb.position.set(0, (doorFrameH + transomH) / 2, totalDoorW / 2 - jambThick / 2);

            const rightOuterJamb = new THREE.Mesh(
                new THREE.BoxGeometry(frameDepth, doorFrameH + transomH, jambThick),
                frameBlueMat
            );
            rightOuterJamb.position.set(0, (doorFrameH + transomH) / 2, -totalDoorW / 2 + jambThick / 2);

            const doorHeadBar = new THREE.Mesh(
                new THREE.BoxGeometry(frameDepth, jambThick, totalDoorW),
                frameBlueMat
            );
            doorHeadBar.position.set(0, doorFrameH, 0);

            const transomTopBar = new THREE.Mesh(
                new THREE.BoxGeometry(frameDepth, jambThick, totalDoorW),
                frameBlueMat
            );
            transomTopBar.position.set(0, doorFrameH + transomH - jambThick / 2, 0);

            const transomCenterDivider = new THREE.Mesh(
                new THREE.BoxGeometry(frameDepth * 0.85, transomH, jambThick * 0.9),
                frameBlueMat
            );
            transomCenterDivider.position.set(0, doorFrameH + transomH / 2, 0);

            doorGroup.add(leftOuterJamb, rightOuterJamb, doorHeadBar, transomTopBar, transomCenterDivider);

            [-totalDoorW / 4, totalDoorW / 4].forEach((tz) => {
                const tGlass = new THREE.Mesh(
                    new THREE.PlaneGeometry(totalDoorW / 2 - jambThick, transomH - jambThick),
                    glassPaneMat
                );
                tGlass.rotation.y = Math.PI / 2;
                tGlass.position.set(0, doorFrameH + transomH / 2, tz);
                doorGroup.add(tGlass);

                [-0.08, 0.08].forEach((ty) => {
                    const hBar = new THREE.Mesh(
                        new THREE.BoxGeometry(0.014, 0.014, totalDoorW / 2 - jambThick),
                        winBlueMat
                    );
                    hBar.position.set(0, doorFrameH + transomH / 2 + ty, tz);
                    doorGroup.add(hBar);
                });
                [-0.22, -0.07, 0.07, 0.22].forEach((vz) => {
                    const vBar = new THREE.Mesh(
                        new THREE.BoxGeometry(0.014, transomH - jambThick, 0.014),
                        winBlueMat
                    );
                    vBar.position.set(0, doorFrameH + transomH / 2, tz + vz);
                    doorGroup.add(vBar);
                });
            });

            classroomDoors = [];
            const innerOpeningW = totalDoorW - jambThick * 2;
            const leafW = innerOpeningW / 2 - 0.004;
            const leafH = doorFrameH - jambThick / 2 - 0.008;
            const leafThick = 0.044;

            const doorConfigs = [
                {
                    side: 'left',
                    hingeZ: innerOpeningW / 2,
                    slabOffsetZ: -leafW / 2,
                    handleOffsetZ: -leafW + 0.052,
                    leverDirZ: 1,
                    closedRotY: 0,
                    outwardRotY: -Math.PI * 0.94,
                    inwardRotY: Math.PI * 0.45,
                    isHappyDecorated: true
                },
                {
                    side: 'right',
                    hingeZ: -innerOpeningW / 2,
                    slabOffsetZ: leafW / 2,
                    handleOffsetZ: leafW - 0.052,
                    leverDirZ: -1,
                    closedRotY: 0,
                    outwardRotY: Math.PI * 0.46,
                    inwardRotY: -Math.PI * 0.45,
                    isHappyDecorated: false
                }
            ];

            const signPlaqueMat = new THREE.MeshStandardMaterial({ map: createClass5ASignTexture(), roughness: 0.35 });

            doorConfigs.forEach((cfg) => {
                const doorPivot = new THREE.Group();
                const outwardX = frameDepth / 2 - 0.01;
                const inwardX = -frameDepth / 2 + 0.01;
                const closedX = 0.0;

                doorPivot.position.set(outwardX, 0.005, cfg.hingeZ);
                doorPivot.rotation.y = cfg.outwardRotY;
                doorPivot.userData = {
                    side: cfg.side,
                    closedRotY: cfg.closedRotY,
                    outwardRotY: cfg.outwardRotY,
                    inwardRotY: cfg.inwardRotY,
                    targetAngle: cfg.outwardRotY,
                    closedX,
                    outwardX,
                    inwardX,
                    targetX: outwardX
                };

                const leafSlab = new THREE.Mesh(
                    new THREE.BoxGeometry(leafThick, leafH, leafW),
                    leafBlueMat
                );
                leafSlab.position.set(0, leafH / 2, cfg.slabOffsetZ);
                leafSlab.castShadow = true;
                leafSlab.receiveShadow = true;
                doorPivot.add(leafSlab);

                // intFace faces +X when swung open outward 170 deg (shows sunflowers & hearts version matching image_28bba4.jpg)
                // extFace faces +X when closed (shows full tulip version matching 00_32_43.png)
                const intFaceMat = cfg.isHappyDecorated ? happyDoorLeafMaterial : blueDoorLeafMaterial;
                const extFaceMat = cfg.isHappyDecorated ? happyDoorTulipMaterial : blueDoorLeafMaterial;

                const intFace = new THREE.Mesh(new THREE.PlaneGeometry(leafW, leafH), intFaceMat);
                intFace.rotation.y = -Math.PI / 2;
                intFace.position.set(-leafThick / 2 - 0.001, leafH / 2, cfg.slabOffsetZ);
                doorPivot.add(intFace);

                const extFace = new THREE.Mesh(new THREE.PlaneGeometry(leafW, leafH), extFaceMat);
                extFace.rotation.y = Math.PI / 2;
                extFace.position.set(leafThick / 2 + 0.001, leafH / 2, cfg.slabOffsetZ);
                doorPivot.add(extFace);

                if (!cfg.isHappyDecorated) {
                    const glassAreaW = leafW * 0.774;
                    const glassAreaH = leafH * 0.625;
                    const glassCenterY = leafH * 0.638;
                    [-1, 1].forEach((sideX) => {
                        const reliefX = sideX * (leafThick / 2 + 0.004);
                        [-glassAreaW / 6, glassAreaW / 6].forEach((mz) => {
                            const vBar = new THREE.Mesh(
                                new THREE.BoxGeometry(0.008, glassAreaH, 0.015),
                                leafBlueMat
                            );
                            vBar.position.set(reliefX, glassCenterY, cfg.slabOffsetZ + mz);
                            doorPivot.add(vBar);
                        });
                        for (let r = 1; r <= 4; r++) {
                            const my = (glassCenterY - glassAreaH / 2) + (glassAreaH / 5) * r;
                            const hBar = new THREE.Mesh(
                                new THREE.BoxGeometry(0.008, 0.015, glassAreaW),
                                leafBlueMat
                            );
                            hBar.position.set(reliefX, my, cfg.slabOffsetZ);
                            doorPivot.add(hBar);
                        }
                    });
                }

                // 3D Silver Lever Handle + Vertical Escutcheon Plate + Keyhole
                const handleY = leafH * 0.446;
                [-1, 1].forEach((sideX) => {
                    const plateX = sideX * (leafThick / 2 + 0.006);
                    const plate = new THREE.Mesh(
                        new THREE.BoxGeometry(0.008, 0.20, 0.036),
                        silverMetalMat
                    );
                    plate.position.set(plateX, handleY, cfg.handleOffsetZ);
                    doorPivot.add(plate);

                    const spindle = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.01, 0.01, 0.026, 12),
                        silverMetalMat
                    );
                    spindle.rotation.z = Math.PI / 2;
                    spindle.position.set(plateX + sideX * 0.011, handleY + 0.03, cfg.handleOffsetZ);
                    doorPivot.add(spindle);

                    const leverGrip = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.008, 0.007, 0.11, 12),
                        silverMetalMat
                    );
                    leverGrip.rotation.x = Math.PI / 2;
                    leverGrip.position.set(
                        plateX + sideX * 0.022,
                        handleY + 0.03,
                        cfg.handleOffsetZ + cfg.leverDirZ * 0.044
                    );
                    doorPivot.add(leverGrip);

                    const keyhole = new THREE.Mesh(
                        new THREE.PlaneGeometry(0.011, 0.022),
                        keyholeDarkMat
                    );
                    keyhole.rotation.y = sideX < 0 ? -Math.PI / 2 : Math.PI / 2;
                    keyhole.position.set(plateX + sideX * 0.0045, handleY - 0.05, cfg.handleOffsetZ);
                    doorPivot.add(keyhole);
                });

                // 3 Silver Barrel Hinges along the Outer Hinge Stile
                [leafH * 0.12, leafH * 0.58, leafH * 0.88].forEach((hy) => {
                    const hingeBarrel = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.009, 0.009, 0.09, 12),
                        silverMetalMat
                    );
                    hingeBarrel.position.set(0, hy, 0);
                    doorPivot.add(hingeBarrel);
                });

                doorGroup.add(doorPivot);
                classroomDoors.push(doorPivot);
            });

            // Overhead "Lớp 5A" Sign mounted on the wall directly ABOVE the top of the door frame
            const overheadSignGroup = new THREE.Group();
            overheadSignGroup.position.set(0, doorFrameH + transomH + 0.26, 0);
            const signBoardBody = new THREE.Mesh(
                new THREE.BoxGeometry(0.18, 0.32, 0.88),
                new THREE.MeshStandardMaterial({ color: 0x0056b3, roughness: 0.4 })
            );
            overheadSignGroup.add(signBoardBody);
            [-1, 1].forEach((sideX) => {
                const signFace = new THREE.Mesh(
                    new THREE.PlaneGeometry(0.84, 0.29),
                    signPlaqueMat
                );
                signFace.rotation.y = sideX < 0 ? -Math.PI / 2 : Math.PI / 2;
                signFace.position.x = sideX * 0.092;
                overheadSignGroup.add(signFace);
            });
            doorGroup.add(overheadSignGroup);

            scene.add(doorGroup);

            // ========================================================================
            // B. CENTER WALL BOARDS: NEW "LỚP 5A" SIGN & "BẢNG PHÂN CÔNG TRỰC NHẬT"
            // ========================================================================
            const boardsCenterZ = -0.18;
            const creamBackingMat = new THREE.MeshStandardMaterial({ color: 0xf2e8ce, roughness: 0.65 });

            // 1. Top Board: "Lớp 5A - Cùng học tập – Cùng sẻ chia – Cùng tiến bộ" (Ảnh ChatGPT 00_32_36 13 thg 11, 2026-1.png)
            const lop5ABoardGroup = new THREE.Group();
            lop5ABoardGroup.position.set(wallSurfaceX + 0.012, 2.45, boardsCenterZ);
            const lop5ABacking = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.86, 1.36), creamBackingMat);
            const lop5AFace = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 0.85), lop5ASignMaterial);
            lop5AFace.rotation.y = Math.PI / 2;
            lop5AFace.position.x = 0.010;
            lop5ABoardGroup.add(lop5ABacking, lop5AFace);
            scene.add(lop5ABoardGroup);

            // 2. Bottom Board: "BẢNG PHÂN CÔNG TRỰC NHẬT VÀ CHĂM SÓC MÔI TRƯỜNG LỚP HỌC - Tuần 1" (Ảnh ChatGPT 00_32_37 13 thg 11, 2026-2.png)
            const gocXanhGroup = new THREE.Group();
            gocXanhGroup.position.set(wallSurfaceX + 0.014, 1.15, boardsCenterZ);
            const gocXanhBacking = new THREE.Mesh(new THREE.BoxGeometry(0.020, 1.559, 1.24), creamBackingMat);
            gocXanhBacking.castShadow = true;
            const gocXanhFace = new THREE.Mesh(new THREE.PlaneGeometry(1.23, 1.549), gocXanhBoardMaterial);
            gocXanhFace.rotation.y = Math.PI / 2;
            gocXanhFace.position.x = 0.011;
            gocXanhGroup.add(gocXanhBacking, gocXanhFace);
            scene.add(gocXanhGroup);

            // ========================================================================
            // C. 3-BAY BLUE CORRIDOR WINDOW + 3 REALISTIC RIBBED HANGING POTS
            // ========================================================================
            const winCenterZ = 2.25;
            const winW = 2.80; // Z from +0.85 to +3.65
            const winH = 1.72; // Y from 0.96 to 2.68
            const winCenterY = 0.96 + winH / 2;

            const corrWinGroup = new THREE.Group();
            corrWinGroup.position.set(ROOM_W / 2 + 0.07, winCenterY, winCenterZ);

            // Outer Periwinkle-Blue Window Frame matching image_28bba4.jpg & 00_32_39.png
            const wTop = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.055, winW), winBlueMat);
            wTop.position.y = winH / 2 - 0.027;
            const wBot = wTop.clone();
            wBot.position.y = -winH / 2 + 0.027;
            const wTransomBar = new THREE.Mesh(new THREE.BoxGeometry(0.155, 0.052, winW), winBlueMat);
            wTransomBar.position.y = winH / 2 - 0.38;
            corrWinGroup.add(wTop, wBot, wTransomBar);

            const bayW = (winW - 0.055) / 3;
            for (let m = 0; m <= 3; m++) {
                const mz = -winW / 2 + 0.0275 + m * bayW;
                const vMullion = new THREE.Mesh(new THREE.BoxGeometry(0.155, winH, 0.05), winBlueMat);
                vMullion.position.z = mz;
                corrWinGroup.add(vMullion);
            }

            // Glass, Light-Blue Security Bars & 3 Realistic Ribbed Hanging Planters
            const gridBarMat = new THREE.MeshStandardMaterial({ color: 0x7cc0e8, roughness: 0.35 });
            for (let b = 0; b < 3; b++) {
                const bz = -winW / 2 + 0.0275 + (b + 0.5) * bayW;

                const bayGlass = new THREE.Mesh(new THREE.PlaneGeometry(bayW - 0.05, winH - 0.10), glassPaneMat);
                bayGlass.rotation.y = Math.PI / 2;
                bayGlass.position.set(0, 0, bz);
                corrWinGroup.add(bayGlass);

                for (let gy = -winH / 2 + 0.22; gy <= winH / 2 - 0.15; gy += 0.21) {
                    const hGrid = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.015, bayW - 0.04), gridBarMat);
                    hGrid.position.set(0, gy, bz);
                    corrWinGroup.add(hGrid);
                }
                for (let gz = -bayW / 2 + 0.18; gz <= bayW / 2 - 0.14; gz += 0.18) {
                    const vGrid = new THREE.Mesh(new THREE.BoxGeometry(0.015, winH - 0.08, 0.015), gridBarMat);
                    vGrid.position.set(0, 0, bz + gz);
                    corrWinGroup.add(vGrid);
                }

                // Middle hanging pot (b === 1) has blooming pink cosmos flowers + pothos vines!
                const realisticHangingPot = createRealisticRibbedHangingBasket(b === 1);
                realisticHangingPot.position.set(0.11, winH / 2 - 0.38, bz);
                corrWinGroup.add(realisticHangingPot);
            }

            scene.add(corrWinGroup);

            // ========================================================================
            // D. WALL-MOUNTED WHITE PICKET FENCE FLOWER BOX + LOWER 7-FLOWER BORDER
            //    (Matches image_28bba4.jpg & Ảnh ChatGPT 00_32_39 13 thg 11, 2026-3.png)
            // ========================================================================
            const windowBoxGroup = new THREE.Group();
            windowBoxGroup.position.set(wallSurfaceX, 0, winCenterZ);

            const boxLen = 2.66;
            const fenceWhiteMat = new THREE.MeshStandardMaterial({ color: 0xfefefe, roughness: 0.32 });
            const troughDarkMat = new THREE.MeshStandardMaterial({ color: 0x3b2f26, roughness: 0.85 });

            // 1. High-res Botanical Flower & Foliage Backdrop Plane right above the White Picket Fence
            const wfbPlane = new THREE.Mesh(new THREE.PlaneGeometry(boxLen, 0.44), winFlowerBoxMaterial);
            wfbPlane.rotation.y = Math.PI / 2;
            wfbPlane.position.set(0.012, 0.72, 0);
            windowBoxGroup.add(wfbPlane);

            // 2. 3D Planter Trough & 3D Pointed White Picket Fence mounted on the Wall (y = 0.50 to 0.74)
            const trough = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.15, boxLen - 0.08), troughDarkMat);
            trough.position.set(0.048, 0.60, 0);
            windowBoxGroup.add(trough);

            // 2 Horizontal White Fence Rails
            [0.55, 0.65].forEach((ry) => {
                const hRail = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.026, boxLen), fenceWhiteMat);
                hRail.position.set(0.098, ry, 0);
                hRail.castShadow = true;
                windowBoxGroup.add(hRail);

                // Side return rails connecting to the wall
                [-boxLen / 2 + 0.01, boxLen / 2 - 0.01].forEach((sz) => {
                    const sRail = new THREE.Mesh(new THREE.BoxGeometry(0.098, 0.026, 0.018), fenceWhiteMat);
                    sRail.position.set(0.049, ry, sz);
                    windowBoxGroup.add(sRail);
                });
            });

            // 21 Pointed 3D White Pickets along the front of the Window Box
            const numPickets = 21;
            for (let p = 0; p < numPickets; p++) {
                const pz = -boxLen / 2 + 0.05 + (p / (numPickets - 1)) * (boxLen - 0.10);
                const picketBody = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.21, 0.054), fenceWhiteMat);
                picketBody.position.set(0.112, 0.605, pz);
                picketBody.castShadow = true;

                const picketTip = new THREE.Mesh(new THREE.ConeGeometry(0.038, 0.045, 4), fenceWhiteMat);
                picketTip.rotation.y = Math.PI / 4;
                picketTip.position.set(0.112, 0.732, pz);
                windowBoxGroup.add(picketBody, picketTip);
            }

            // 3. 3D Botanical Pointed Leaves & 3D Pink/Yellow Cosmos Blossoms emerging from the Window Box
            const broadLeafGeo = getRealisticBroadLeafGeometry();
            const leafLight = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.44, side: THREE.DoubleSide });
            const leafMid = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.45, side: THREE.DoubleSide });
            const leafDark = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.48, side: THREE.DoubleSide });
            const boxLeafMats = [leafLight, leafMid, leafDark];

            for (let i = 0; i < 48; i++) {
                const lz = -boxLen / 2 + 0.10 + (i / 47) * (boxLen - 0.20);
                const blade = new THREE.Mesh(broadLeafGeo, boxLeafMats[i % 3]);
                const s = 0.58 + (i % 3) * 0.12;
                blade.scale.set(s, s, s);
                blade.position.set(0.055 + (i % 2) * 0.025, 0.66, lz);
                blade.rotation.y = Math.PI / 2 + ((i % 3) - 1) * 0.35;
                blade.rotation.x = 0.28 + (i % 2) * 0.22;
                blade.castShadow = true;
                windowBoxGroup.add(blade);
            }

            // 18 3D Multi-Petal Pink, Yellow & Coral Blossoms along the Window Box
            for (let f = 0; f < 18; f++) {
                const fz = -boxLen / 2 + 0.16 + (f / 17) * (boxLen - 0.32);
                const isYellow = (f === 2 || f === 14 || f === 15);
                const petalColor = isYellow ? 0xfacc15 : (f % 2 === 0 ? 0xf472b6 : 0xfb7185);
                const centerColor = isYellow ? 0xd97706 : 0xfacc15;
                const blossom = createRealisticDaisyBlossom(petalColor, centerColor, 1.15);
                blossom.position.set(0.105 + (f % 2) * 0.015, 0.74 + (f % 3) * 0.04, fz);
                blossom.rotation.y = Math.PI / 2 + (f % 3 - 1) * 0.2;
                blossom.rotation.x = -0.15;
                windowBoxGroup.add(blossom);
            }

            // 4. Lower Wall Mural: 7 Colorful Flowers & Green Grass Border (y = 0.12 to 0.48)
            const grassMuralPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(boxLen + 0.06, 0.38),
                grassFlowersBorderMaterial
            );
            grassMuralPlane.rotation.y = Math.PI / 2;
            grassMuralPlane.position.set(0.008, 0.30, 0);
            windowBoxGroup.add(grassMuralPlane);

            scene.add(windowBoxGroup);
        }

        // ============================================================================
        // 6 COLLABORATIVE STUDENT GROUP TABLES (NHÓM 1 – NHÓM 6)
        // EXACT MATCH TO image_c6971a.jpg & image_c69716.jpg
        // ============================================================================
        function createGroupBadgeTexture(groupNumber) {
            const canvas = document.createElement('canvas');
            canvas.width = 320;
            canvas.height = 96;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(6, 6, 308, 84, 42);
            ctx.fill();

            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.roundRect(6, 6, 308, 84, 42);
            ctx.stroke();

            // Cute pink 5-petal flowers on left & right
            [46, 274].forEach((fx) => {
                for (let p = 0; p < 5; p++) {
                    const ang = (p / 5) * Math.PI * 2;
                    ctx.fillStyle = '#f472b6';
                    ctx.beginPath();
                    ctx.arc(fx + Math.cos(ang) * 9, 48 + Math.sin(ang) * 9, 7, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = '#facc15';
                ctx.beginPath();
                ctx.arc(fx, 48, 5.5, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.fillStyle = '#0f296b';
            ctx.font = '900 40px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Nhóm ${groupNumber}`, 160, 50);

            const tex = new THREE.CanvasTexture(canvas);
            tex.encoding = THREE.sRGBEncoding;
            tex.anisotropy = 8;
            return tex;
        }

        function createDesktopCenterPlant() {
            const group = new THREE.Group();
            const bowlCreamMat = new THREE.MeshStandardMaterial({
                color: 0xf8f5ee,
                roughness: 0.30,
                metalness: 0.04
            });

            // Smooth rounded white ceramic pot matching image_c6971a.jpg
            const pts = [
                new THREE.Vector2(0.0, 0.0),
                new THREE.Vector2(0.052, 0.0),
                new THREE.Vector2(0.072, 0.035),
                new THREE.Vector2(0.082, 0.085),
                new THREE.Vector2(0.085, 0.115),
                new THREE.Vector2(0.076, 0.115),
                new THREE.Vector2(0.072, 0.095)
            ];
            const potMesh = new THREE.Mesh(new THREE.LatheGeometry(pts, 24), bowlCreamMat);
            potMesh.castShadow = true;
            group.add(potMesh);

            const soil = new THREE.Mesh(
                new THREE.CylinderGeometry(0.074, 0.070, 0.015, 18),
                new THREE.MeshStandardMaterial({ color: 0x3b2514, roughness: 0.9 })
            );
            soil.position.y = 0.098;
            group.add(soil);

            // Lush rosette of curved 3D pointed green leaves
            const leafGeo = getRealisticBroadLeafGeometry();
            const lightGreen = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.42, side: THREE.DoubleSide });
            const midGreen = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.44, side: THREE.DoubleSide });
            const deepGreen = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.46, side: THREE.DoubleSide });
            const mats = [lightGreen, midGreen, deepGreen];

            [
                { count: 8, tilt: 0.68, scale: 0.56, y: 0.098 },
                { count: 6, tilt: 0.38, scale: 0.48, y: 0.105 }
            ].forEach((tier, tIdx) => {
                for (let i = 0; i < tier.count; i++) {
                    const ang = (i / tier.count) * Math.PI * 2 + tIdx * 0.45;
                    const pivot = new THREE.Group();
                    pivot.position.set(Math.cos(ang) * 0.015, tier.y, Math.sin(ang) * 0.015);
                    pivot.rotation.y = -ang + Math.PI / 2;
                    pivot.rotation.x = tier.tilt;

                    const blade = new THREE.Mesh(leafGeo, mats[(i + tIdx) % 3]);
                    blade.scale.set(tier.scale, tier.scale, tier.scale);
                    blade.castShadow = true;
                    pivot.add(blade);
                    group.add(pivot);
                }
            });

            return group;
        }

        function createGroupStudentChair(woodMat, steelMat, capMat) {
            const chair = new THREE.Group();
            const sW = 0.36, sD = 0.35, sH = 0.39;

            // Warm Honey-Oak Wooden Seat with Rounded Edges
            const seat = new THREE.Mesh(new THREE.BoxGeometry(sW, 0.026, sD), woodMat);
            seat.position.y = sH;
            seat.castShadow = true;
            seat.receiveShadow = true;
            chair.add(seat);

            // Warm Honey-Oak Wooden Backrest
            const back = new THREE.Mesh(new THREE.BoxGeometry(sW, 0.18, 0.024), woodMat);
            back.position.set(0, sH + 0.19, sD / 2 - 0.012);
            back.castShadow = true;
            chair.add(back);

            // 4 Angled Cylindrical Silver-Grey Steel Legs with Black Foot Caps (matching image_c6971a.jpg)
            [
                [-sW / 2 + 0.036, -sD / 2 + 0.036, -0.04, -0.04],
                [ sW / 2 - 0.036, -sD / 2 + 0.036, -0.04,  0.04],
                [-sW / 2 + 0.036,  sD / 2 - 0.036,  0.05, -0.04],
                [ sW / 2 - 0.036,  sD / 2 - 0.036,  0.05,  0.04]
            ].forEach(([lx, lz, tiltX, tiltZ]) => {
                const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.012, sH, 12), steelMat);
                leg.position.set(lx, sH / 2, lz);
                leg.rotation.x = tiltX;
                leg.rotation.z = tiltZ;
                leg.castShadow = true;
                chair.add(leg);

                const footCap = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.024, 12), capMat);
                footCap.position.set(lx - tiltZ * 0.18, 0.012, lz + tiltX * 0.18);
                chair.add(footCap);
            });

            // 2 Tubular Steel Backrest Posts curving up from under the seat
            const rivetMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.85, roughness: 0.2 });
            [-sW / 2 + 0.038, sW / 2 - 0.038].forEach((bx) => {
                const post = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.26, 12), steelMat);
                post.position.set(bx, sH + 0.13, sD / 2 + 0.004);
                chair.add(post);

                // Silver rivet dot on front of backrest
                const rivet = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.028, 10), rivetMat);
                rivet.rotation.x = Math.PI / 2;
                rivet.position.set(bx * 0.82, sH + 0.19, sD / 2 - 0.012);
                chair.add(rivet);
            });

            return chair;
        }

        function buildStudentDesksAndChairs() {
            const honeyWoodTex = createHoneyOakWoodTexture();
            const deskTopMat = new THREE.MeshStandardMaterial({
                map: honeyWoodTex,
                roughness: 0.42,
                metalness: 0.04
            });
            const steelMat = new THREE.MeshStandardMaterial({
                color: 0xcbd5e1,
                metalness: 0.45,
                roughness: 0.34
            });
            const apronMat = new THREE.MeshStandardMaterial({
                color: 0x94a3b8,
                metalness: 0.38,
                roughness: 0.42
            });
            const blackCapMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.72 });

            // 6 Group Tables arranged in 2 rows × 3 columns (Nhóm 1, 2, 3 in front row; Nhóm 4, 5, 6 in back row)
            const colX = [-1.88, 0.22, 2.32];
            const rowZ = [-0.98, 1.18];

            const tW = 1.18, tH = 0.65, tD = 0.94;

            rowZ.forEach((rz, rIdx) => {
                colX.forEach((cx, cIdx) => {
                    const groupNum = rIdx * 3 + cIdx + 1;
                    const tableGroup = new THREE.Group();
                    tableGroup.position.set(cx, 0, rz);

                    // 1. Honey-Oak Group Tabletop with Beveled Edge
                    const topSlab = new THREE.Mesh(new THREE.BoxGeometry(tW, 0.036, tD), deskTopMat);
                    topSlab.position.y = tH;
                    topSlab.castShadow = true;
                    topSlab.receiveShadow = true;
                    tableGroup.add(topSlab);

                    // Recessed Metal Under-Frame Apron
                    const apron = new THREE.Mesh(new THREE.BoxGeometry(tW - 0.12, 0.032, tD - 0.12), apronMat);
                    apron.position.y = tH - 0.032;
                    tableGroup.add(apron);

                    // 2. Four Cylindrical Silver-Grey Tubular Steel Legs with Black Rubber Foot Caps
                    [
                        [-tW / 2 + 0.075, -tD / 2 + 0.075],
                        [ tW / 2 - 0.075, -tD / 2 + 0.075],
                        [-tW / 2 + 0.075,  tD / 2 - 0.075],
                        [ tW / 2 - 0.075,  tD / 2 - 0.075]
                    ].forEach(([lx, lz]) => {
                        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, tH - 0.02, 16), steelMat);
                        leg.position.set(lx, (tH - 0.02) / 2 + 0.02, lz);
                        leg.castShadow = true;
                        tableGroup.add(leg);

                        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.030, 0.026, 16), blackCapMat);
                        cap.position.set(lx, 0.013, lz);
                        tableGroup.add(cap);
                    });

                    // 3. Centerpiece White Ceramic Potted Plant right in the center of the Group Table
                    const centerPlant = createDesktopCenterPlant();
                    centerPlant.position.set(0, tH + 0.018, -0.02);
                    tableGroup.add(centerPlant);

                    // Group Nameplate Badge ("🌸 Nhóm 1 🌸" .. "🌸 Nhóm 6 🌸") on Tabletop
                    const badgePlane = new THREE.Mesh(
                        new THREE.PlaneGeometry(0.36, 0.11),
                        new THREE.MeshStandardMaterial({
                            map: createGroupBadgeTexture(groupNum),
                            roughness: 0.4
                        })
                    );
                    badgePlane.rotation.x = -Math.PI / 2;
                    badgePlane.position.set(0, tH + 0.019, 0.26);
                    tableGroup.add(badgePlane);

                    // 4. Six Student Chairs around the Group Table (2 North, 2 South, 1 West, 1 East)
                    const chairPlacements = [
                        // 2 Chairs on North side (-Z), facing +Z toward table center
                        { x: -0.27, z: -tD / 2 - 0.12, rotY: Math.PI },
                        { x:  0.27, z: -tD / 2 - 0.12, rotY: Math.PI },
                        // 2 Chairs on South side (+Z), facing -Z toward table center
                        { x: -0.27, z:  tD / 2 + 0.12, rotY: 0 },
                        { x:  0.27, z:  tD / 2 + 0.12, rotY: 0 },
                        // 1 Chair on West/Left side (-X), facing +X toward table center
                        { x: -tW / 2 - 0.12, z: 0.0, rotY: -Math.PI / 2 },
                        // 1 Chair on East/Right side (+X), facing -X toward table center
                        { x:  tW / 2 + 0.12, z: 0.0, rotY:  Math.PI / 2 }
                    ];

                    chairPlacements.forEach((cp) => {
                        const ch = createGroupStudentChair(deskTopMat, steelMat, blackCapMat);
                        ch.position.set(cp.x, 0, cp.z);
                        ch.rotation.y = cp.rotY;
                        tableGroup.add(ch);
                    });

                    scene.add(tableGroup);
                });
            });
        }

        // ============================================================================
        // INTERACTIVE HOTSPOTS & CAMERA ANIMATION
        // ============================================================================
        function createHotspotsUI() {
            const layer = document.getElementById('hotspots-layer');
            layer.innerHTML = '';

            HOTSPOTS_DATA.forEach((item) => {
                const el = document.createElement('div');
                el.id = `hotspot-${item.id}`;
                el.className = 'hotspot-marker glass-panel px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-white shadow-lg border border-amber-400/50';
                el.innerHTML = `<span>${item.icon}</span><span class="hidden sm:inline">${item.title.split('&')[0]}</span>`;
                el.onclick = () => openInfoCard(item);
                layer.appendChild(el);
                item.domEl = el;
            });
        }

        function updateHotspotsProjection() {
            HOTSPOTS_DATA.forEach((item) => {
                if (!item.domEl) return;
                if (!showHotspots) {
                    item.domEl.style.opacity = '0';
                    item.domEl.style.pointerEvents = 'none';
                    return;
                }

                const projected = item.pos.clone().project(camera);
                const isBehind = projected.z > 1.0;
                const dist = camera.position.distanceTo(item.pos);

                if (isBehind || dist > 14.5) {
                    item.domEl.style.opacity = '0';
                    item.domEl.style.pointerEvents = 'none';
                } else {
                    const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
                    const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;
                    item.domEl.style.left = `${x}px`;
                    item.domEl.style.top = `${y}px`;
                    item.domEl.style.opacity = '1';
                    item.domEl.style.pointerEvents = 'auto';
                }
            });
        }

        function openInfoCard(item) {
            document.getElementById('info-icon').textContent = item.icon;
            document.getElementById('info-title').textContent = item.title;
            document.getElementById('info-desc').textContent = item.desc;

            const tagsContainer = document.getElementById('info-tags');
            tagsContainer.innerHTML = item.tags
                .map(t => `<span class="px-2 py-0.5 rounded-md bg-indigo-500/25 border border-indigo-400/30 text-[11px] text-indigo-200 font-medium">${t}</span>`)
                .join('');

            const card = document.getElementById('info-card');
            card.classList.remove('opacity-0', 'pointer-events-none', 'translate-x-6');
            card.classList.add('opacity-100', 'pointer-events-auto', 'translate-x-0');

            if (item.camPreset) {
                moveCameraToPreset(item.camPreset);
            }
        }

        function closeInfoCard() {
            const card = document.getElementById('info-card');
            card.classList.add('opacity-0', 'pointer-events-none', 'translate-x-6');
            card.classList.remove('opacity-100', 'pointer-events-auto', 'translate-x-0');
        }

        function moveCameraToPreset(presetKey, durationMs = 1200) {
            const preset = CAMERA_PRESETS[presetKey];
            if (!preset) return;

            cameraTween = {
                startPos: camera.position.clone(),
                endPos: preset.pos.clone(),
                startTarget: camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(6)),
                endTarget: preset.target.clone(),
                startTime: performance.now(),
                duration: durationMs
            };
        }

        function playExteriorToInteriorTour() {
            camera.position.copy(CAMERA_PRESETS.exterior.pos);
            controls.target.copy(CAMERA_PRESETS.exterior.target);
            pointCameraAtTarget();

            setTimeout(() => {
                moveCameraToPreset('overview', 2400);
            }, 350);
        }

        function toggleFans() {
            fansSpinning = !fansSpinning;
            const el = document.getElementById('fan-state-text');
            if (el) {
                el.textContent = fansSpinning ? 'Bật' : 'Tắt';
                el.className = fansSpinning ? 'text-emerald-400 font-bold' : 'text-slate-400 font-bold';
            }
            if (wallFanRocker) {
                wallFanRocker.rotation.x = fansSpinning ? -0.22 : 0.22;
            }
            if (wallFanLedMat) {
                wallFanLedMat.color.setHex(fansSpinning ? 0x22c55e : 0xef4444);
            }
        }

        function toggleLights() {
            lightsOn = !lightsOn;
            roomTubeLights.forEach(l => { l.intensity = lightsOn ? 0.18 : 0.0; });
            bulbEmissiveMaterials.forEach(m => { m.emissiveIntensity = lightsOn ? 0.65 : 0.05; });
            const el = document.getElementById('light-state-text');
            if (el) {
                el.textContent = lightsOn ? 'Bật' : 'Tắt';
                el.className = lightsOn ? 'text-amber-300 font-bold' : 'text-slate-400 font-bold';
            }
            if (wallLightRocker) {
                wallLightRocker.rotation.x = lightsOn ? -0.22 : 0.22;
            }
            if (wallLightLedMat) {
                wallLightLedMat.color.setHex(lightsOn ? 0x22c55e : 0xef4444);
            }
        }

        function toggleHotspots() {
            showHotspots = !showHotspots;
            if (!showHotspots) closeInfoCard();
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animate(now = performance.now()) {
            requestAnimationFrame(animate);

            const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
            lastFrameTime = now;

            if (fansSpinning) {
                ceilingFans.forEach(f => { f.rotation.y += 0.09; });
            }

            // Smooth swinging of the 3D First Aid Cabinet glass door
            if (firstAidDoorPivot && firstAidDoorPivot.userData) {
                const targetRot = firstAidDoorPivot.userData.targetRotY || 0;
                const diffRot = targetRot - firstAidDoorPivot.rotation.y;
                if (Math.abs(diffRot) > 0.001) {
                    firstAidDoorPivot.rotation.y += diffRot * Math.min(1, dt * 8.5);
                }
            }

            // Smooth swinging of the 4 hinged lower cabinet doors (Kệ nước uống & Trạm vệ sinh cá nhân)
            lowerCabinetDoors.forEach((doorPivot) => {
                if (!doorPivot.userData) return;
                const targetRot = doorPivot.userData.targetRotY || 0;
                const diffRot = targetRot - doorPivot.rotation.y;
                if (Math.abs(diffRot) > 0.001) {
                    doorPivot.rotation.y += diffRot * Math.min(1, dt * 8.0);
                } else {
                    doorPivot.rotation.y = targetRot;
                }
            });

            // Smooth sliding of the two chalkboard wings
            boardWings.forEach((w) => {
                const u = w.userData;
                const diff = u.target - u.progress;
                if (Math.abs(diff) > 0.0001) {
                    u.progress += Math.sign(diff) * Math.min(Math.abs(diff), dt * 1.6);
                    const e = u.progress * u.progress * (3 - 2 * u.progress);
                    w.position.x = u.outX + (u.inX - u.outX) * e;
                }
            });

            // Smooth swinging of the connected 2-leaf blue "Lớp 5A" doors (outward / inward / closed)
            classroomDoors.forEach((doorPivot) => {
                const u = doorPivot.userData;
                if (!u) return;
                const angleDiff = u.targetAngle - doorPivot.rotation.y;
                if (Math.abs(angleDiff) > 0.0005) {
                    doorPivot.rotation.y += angleDiff * Math.min(1.0, dt * 6.5);
                } else {
                    doorPivot.rotation.y = u.targetAngle;
                }
                const xDiff = u.targetX - doorPivot.position.x;
                if (Math.abs(xDiff) > 0.0002) {
                    doorPivot.position.x += xDiff * Math.min(1.0, dt * 8.0);
                } else {
                    doorPivot.position.x = u.targetX;
                }
            });

            // Smooth swivel interpolation & gentle oscillation for Teacher's Office Chair
            if (teacherChairSwivelGroup) {
                if (teacherChairAutoOscillate) {
                    teacherChairTargetYaw = 0.22 + Math.sin(now * 0.0012) * 0.32;
                }
                teacherChairSwivelGroup.rotation.y += (teacherChairTargetYaw - teacherChairSwivelGroup.rotation.y) * 0.08;
            }

            if (cameraTween) {
                const elapsed = now - cameraTween.startTime;
                const progress = Math.min(elapsed / cameraTween.duration, 1.0);
                const eased = easeInOutCubic(progress);

                camera.position.lerpVectors(cameraTween.startPos, cameraTween.endPos, eased);
                controls.target.lerpVectors(cameraTween.startTarget, cameraTween.endTarget, eased);
                camera.lookAt(controls.target);
    
                if (progress >= 1.0) {
                    cameraTween = null;
                    syncYawPitchFromCamera();
                }
            }

            updateWalking(dt);
            updateHotspotsProjection();
            renderer.render(scene, camera);
        }

        window.onload = function () {
            initScene();
        };

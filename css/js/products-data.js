const PRODUCTS = [
    {
        id: "tui-xach-tay-lr-velvet-xanh",
        category: "Túi xách tay",
        name: "Túi xách tay LR Velvet",
        fullName: "Túi xách tay LR Velvet - Xanh",
        color: "Xanh",
        colorHex: "#3a5a78",
        price: 799000,
        image: "images/sanpham/Túi xách tay LR Velvet xanh-799.000đ"
    },
    {
        id: "tui-xach-tay-lr-velvet-hong",
        category: "Túi xách tay",
        name: "Túi xách tay LR Velvet",
        fullName: "Túi xách tay LR Velvet - Hồng",
        color: "Hồng",
        colorHex: "#e8b4c4",
        price: 799000,
        image: "images/sanpham/Túi xách tay LR Velvet hồng-799.000đ"
    },
    {
        id: "tui-xach-tay-lr-lyra-den",
        category: "Túi xách tay",
        name: "Túi xách tay LR Lyra",
        fullName: "Túi xách tay LR Lyra- Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1435000,
        image: "images/sanpham/Túi xách tay LR Lyra- Đen-1.435.000đ.png"
    },
    {
        id: "tui-xach-tay-lr-lyra-nau",
        category: "Túi xách tay",
        name: "Túi xách tay LR Lyra",
        fullName: "Túi xách tay LR Lyra - Nâu",
        color: "Nâu",
        colorHex: "#6b4226",
        price: 1439000,
        image: "images/sanpham/Túi xách tay LR Lyra - Nâu-1.439.000đ.png"
    },
    {
        id: "tui-xach-tay-lr-grace-den",
        category: "Túi xách tay",
        name: "Túi xách tay LR Grace",
        fullName: "Túi xách tay LR Grace - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1559000,
        image: "images/sanpham/Túi xách tay LR Grace-1.559.000đ.jpg"
    },
    {
        id: "tui-xach-tay-lr-florence-do",
        category: "Túi xách tay",
        name: "Túi xách tay LR Florence",
        fullName: "Túi xách tay LR Florence - Đỏ",
        color: "Đỏ",
        colorHex: "#8a1f2b",
        price: 1245000,
        image: "images/sanpham/Túi xách tay_Túi đeo chéo LR Florence đỏ-1.245.000đ.png"
    },
    {
        id: "tui-xach-tay-lr-florence-den",
        category: "Túi xách tay",
        name: "Túi xách tay LR Florence",
        fullName: "Túi xách tay LR Florence - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1245000,
        image: "images/sanpham/Túi xách tay_Túi đeo chéo LR Florence đen-1.245.000đ.jpg"
    },
    {
        id: "tui-xach-tay-lr-cherie-be",
        category: "Túi xách tay",
        name: "Túi xách tay LR Chérie",
        fullName: "Túi xách tay LR Chérie - Be",
        color: "Be",
        colorHex: "#d8c3a5",
        price: 960000,
        image: "images/sanpham/Túi xách tay LR Chérie-960.000đ.jpg"
    },
    {
        id: "tui-xach-tay-lr-bella-hong",
        category: "Túi xách tay",
        name: "Túi xách tay LR Bella",
        fullName: "Túi xách tay LR Bella - Hồng",
        color: "Hồng",
        colorHex: "#e8b4c4",
        price: 1249000,
        image: "images/sanpham/Túi xách tay LR Bella-1.249.000đ.png"
    },
    {
        id: "tui-xach-tay-lr-bella-trang",
        category: "Túi xách tay",
        name: "Túi xách tay LR Bella",
        fullName: "Túi xách tay LR Bella - Trắng",
        color: "Trắng",
        colorHex: "#ffffff",
        price: 1249000,
        image: "images/sanpham/Túi xách tay LR Bella trắng-1.249.000đ.jpg"
    },
    {
        id: "tui-xach-tay-lr-amour-nau",
        category: "Túi xách tay",
        name: "Túi xách tay LR Amour",
        fullName: "Túi xách tay LR Amour - Nâu",
        color: "Nâu",
        colorHex: "#6b4226",
        price: 1049000,
        image: "images/sanpham/Túi xách tay_Túi đeo chéo LR Amour nâu-1.049.000đ.png"
    },
    {
        id: "tui-xach-tay-lr-amour-den",
        category: "Túi xách tay",
        name: "Túi xách tay LR Amour",
        fullName: "Túi xách tay LR Amour - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1049000,
        image: "images/sanpham/Túi xách tay_Túi đeo chéo LR Amour đen-1.049.000đ.jpg"
    },
    {
        id: "tui-deo-vai-lr-eysia-den",
        category: "Túi đeo vai",
        name: "Túi đeo vai LR Eysia",
        fullName: "Túi đeo vai LR Eysia - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1355000,
        image: "images/sanpham/Túi đeo vai_Túi đeo chéo LR Eysia đen-1.355.000đ.png"
    },
    {
        id: "tui-deo-vai-lr-aura-xanh",
        category: "Túi đeo vai",
        name: "Túi đeo vai LR Aura",
        fullName: "Túi đeo vai LR Aura - Xanh",
        color: "Xanh",
        colorHex: "#3a5a78",
        price: 939000,
        image: "images/sanpham/Túi đeo vai_Túi đeo chéo LR Aura-939.000đ.jpg"
    },
    {
        id: "tui-deo-vai-celeste-kem",
        category: "Túi đeo vai",
        name: "Túi đeo vai Celeste",
        fullName: "Túi đeo vai Celeste - Kem",
        color: "Kem",
        colorHex: "#f0e6d2",
        price: 949000,
        image: "images/sanpham/Túi đeo vai_Túi đeo chéo Celeste-949.000đ.png"
    },
    {
        id: "tui-deo-vai-celeste-den",
        category: "Túi đeo vai",
        name: "Túi đeo vai Celeste",
        fullName: "Túi đeo vai Celeste - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 949000,
        image: "images/sanpham/Túi đeo vai_Túi đeo chéo Celeste đen-949.000đ.jpg"
    },
    {
        id: "tui-deo-vai-stella-be",
        category: "Túi đeo vai",
        name: "Túi đeo vai Stella",
        fullName: "Túi đeo vai Stella - Be",
        color: "Be",
        colorHex: "#d8c3a5",
        price: 1975000,
        image: "images/sanpham/Túi đeo vai Stella-1.975.000đ.png"
    },
    {
        id: "tui-deo-vai-stella-do",
        category: "Túi đeo vai",
        name: "Túi đeo vai Stella",
        fullName: "Túi đeo vai Stella - Đỏ",
        color: "Đỏ",
        colorHex: "#8a1f2b",
        price: 1975000,
        image: "images/sanpham/Túi đeo vai Stella đỏ-1.975.000đ.jpg"
    },
    {
        id: "tui-deo-vai-nova-nau",
        category: "Túi đeo vai",
        name: "Túi đeo vai Nova",
        fullName: "Túi đeo vai Nova - Nâu",
        color: "Nâu",
        colorHex: "#6b4226",
        price: 1085000,
        image: "images/sanpham/Túi đeo vai Nova nâu-1.085.000đ.png"
    },
    {
        id: "tui-deo-vai-nova-den",
        category: "Túi đeo vai",
        name: "Túi đeo vai Nova",
        fullName: "Túi đeo vai Nova - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1085000,
        image: "images/sanpham/Túi đeo vai Nova đen-1.085.000đ.png"
    },
    {
        id: "tui-deo-vai-lr-noir-den",
        category: "Túi đeo vai",
        name: "Túi đeo vai LR Noir",
        fullName: "Túi đeo vai LR Noir - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1065000,
        image: "images/sanpham/Túi đeo vai LR Noir 1.065.000đ.jpg"
    },
    {
        id: "tui-deo-vai-lr-noir-nau",
        category: "Túi đeo vai",
        name: "Túi đeo vai LR Noir",
        fullName: "Túi đeo vai LR Noir - Nâu",
        color: "Nâu",
        colorHex: "#6b4226",
        price: 1065000,
        image: "images/sanpham/Túi đeo vai LR Noir-1.065.000đ.jpg"
    },
    {
        id: "tui-deo-vai-lr-luna-den",
        category: "Túi đeo vai",
        name: "Túi đeo vai LR Luna",
        fullName: "Túi đeo vai LR Luna - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 955000,
        image: "images/sanpham/Túi đeo vai LR Luna-955.000đ.png"
    },
    {
        id: "tui-deo-vai-lr-luna-trang",
        category: "Túi đeo vai",
        name: "Túi đeo vai LR Luna",
        fullName: "Túi đeo vai LR Luna - Trắng",
        color: "Trắng",
        colorHex: "#ffffff",
        price: 955000,
        image: "images/sanpham/Túi đeo vai LR Luna trắng-955.000đ.jpg"
    },
    {
        id: "tui-deo-vai-lr-iris-den",
        category: "Túi đeo vai",
        name: "Túi đeo vai LR Iris",
        fullName: "Túi đeo vai LR Iris - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 869000,
        image: "images/sanpham/Túi đeo vai LR Iris đen-869.000đ.jpg"
    },
        {
        id: "tui-deo-vai-lr-iris-trang",
        category: "Túi đeo vai",
        name: "Túi đeo vai LR Iris",
        fullName: "Túi đeo vai LR Iris - Trắng",
        color: "Đen",
        colorHex: "#ffffff",
        price: 869000,
        image: "images/sanpham/Túi đeo vai LR Iris-869.000đ.png"
    },
    {
        id: "tui-deo-vai-elara-be",
        category: "Túi đeo vai",
        name: "Túi đeo vai Elara",
        fullName: "Túi đeo vai Elara - Be",
        color: "Be",
        colorHex: "#d8c3a5",
        price: 899000,
        image: "images/sanpham/tui-deo-vai-elara-be.jpg"
    },
    {
        id: "tui-deo-vai-elara-xanh",
        category: "Túi đeo vai",
        name: "Túi đeo vai Elara",
        fullName: "Túi đeo vai Elara - Xanh",
        color: "Xanh",
        colorHex: "#3a5a78",
        price: 899000,
        image: "images/sanpham/tui-deo-vai-elara-xanh.jpg"
    },
    {
        id: "tui-deo-cheo-lr-eysia-den",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Eysia",
        fullName: "Túi đeo chéo LR Eysia - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1355000,
        image: "images/sanpham/tui-deo-cheo-lr-eysia-den.jpg"
    },
    {
        id: "tui-deo-cheo-lr-aura-xanh",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Aura",
        fullName: "Túi đeo chéo LR Aura - Xanh",
        color: "Xanh",
        colorHex: "#3a5a78",
        price: 939000,
        image: "images/sanpham/tui-deo-cheo-lr-aura-xanh.jpg"
    },
    {
        id: "tui-deo-cheo-celeste-kem",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo Celeste",
        fullName: "Túi đeo chéo Celeste - Kem",
        color: "Kem",
        colorHex: "#f0e6d2",
        price: 949000,
        image: "images/sanpham/tui-deo-cheo-celeste-kem.jpg"
    },
    {
        id: "tui-deo-cheo-celeste-den",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo Celeste",
        fullName: "Túi đeo chéo Celeste - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 949000,
        image: "images/sanpham/tui-deo-cheo-celeste-den.jpg"
    },
    {
        id: "tui-deo-cheo-lr-amour-nau",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Amour",
        fullName: "Túi đeo chéo LR Amour - Nâu",
        color: "Nâu",
        colorHex: "#6b4226",
        price: 1049000,
        image: "images/sanpham/tui-deo-cheo-lr-amour-nau.jpg"
    },
    {
        id: "tui-deo-cheo-lr-amour-den",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Amour",
        fullName: "Túi đeo chéo LR Amour - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1049000,
        image: "images/sanpham/tui-deo-cheo-lr-amour-den.jpg"
    },
    {
        id: "tui-deo-cheo-lr-seraphina-hong",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Seraphina",
        fullName: "Túi đeo chéo LR Seraphina - Hồng",
        color: "Hồng",
        colorHex: "#e8b4c4",
        price: 1369000,
        image: "images/sanpham/tui-deo-cheo-lr-seraphina-hong.jpg"
    },
    {
        id: "tui-deo-cheo-lr-seraphina-den",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Seraphina",
        fullName: "Túi đeo chéo LR Seraphina - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1369000,
        image: "images/sanpham/tui-deo-cheo-lr-seraphina-den.jpg"
    },
    {
        id: "tui-deo-cheo-lr-hazel-den",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Hazel",
        fullName: "Túi đeo chéo LR Hazel - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1459000,
        image: "images/sanpham/tui-deo-cheo-lr-hazel-den.jpg"
    },
    {
        id: "tui-deo-cheo-lr-hazel-trang",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Hazel",
        fullName: "Túi đeo chéo LR Hazel - Trắng",
        color: "Trắng",
        colorHex: "#ffffff",
        price: 1459000,
        image: "images/sanpham/tui-deo-cheo-lr-hazel-trang.jpg"
    },
    {
        id: "tui-deo-cheo-lr-elysia-do",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Elysia",
        fullName: "Túi đeo chéo LR Elysia - Đỏ",
        color: "Đỏ",
        colorHex: "#8a1f2b",
        price: 1355000,
        image: "images/sanpham/Túi đeo vai_Túi đeo chéo LR Elysia-1.355.00đ.jpg"
    },
    {
        id: "tui-deo-cheo-lr-aura-hong",
        category: "Túi đeo chéo",
        name: "Túi đeo chéo LR Aura",
        fullName: "Túi đeo chéo LR Aura - Hồng",
        color: "Hồng",
        colorHex: "#e8b4c4",
        price: 939000,
        image: "images/sanpham/tui-deo-cheo-lr-aura-hong.jpg"
    },
    {
        id: "tui-tote-lr-classy-nau",
        category: "Túi Tote",
        name: "Túi tote LR Classy",
        fullName: "Túi tote LR Classy - Nâu",
        color: "Nâu",
        colorHex: "#6b4226",
        price: 1295000,
        image: "images/sanpham/tui-tote-lr-classy-nau.jpg"
    },
    {
        id: "tui-tote-lr-classy-den",
        category: "Túi Tote",
        name: "Túi tote LR Classy",
        fullName: "Túi tote LR Classy - Đen",
        color: "Đen",
        colorHex: "#000000",
        price: 1295000,
        image: "images/sanpham/tui-tote-lr-classy-den.jpg"
    },
    {
        id: "vi-cam-tay-handle-xanh",
        category: "Ví cầm tay",
        name: "Ví cầm tay Handle",
        fullName: "Ví cầm tay Handle - Xanh",
        color: "Xanh",
        colorHex: "#3a5a78",
        price: 729000,
        image: "images/sanpham/vi-cam-tay-handle-xanh.jpg"
    },
    {
        id: "vi-cam-tay-handle-kem",
        category: "Ví cầm tay",
        name: "Ví cầm tay Handle",
        fullName: "Ví cầm tay Handle - Kem",
        color: "Kem",
        colorHex: "#f0e6d2",
        price: 729000,
        image: "images/sanpham/vi-cam-tay-handle-kem.jpg"
    },
];

function imgPath(folder, productName, colorLabel, isModel) {
  const suffix = isModel ? ' - model' : '';
  return 'images/' + folder + '/' + productName + ' - ' + colorLabel + suffix + '.jpg';
}

const PRODUCT_DATA = [

  {
    id: "vi-handle",
    name: "Ví cầm tay Handle",
    category: "vi-cam-tay",
    folder: "Ví cầm tay",
    material: "dapu",
    occasion: "dilam",
    price: 729000,
    colors: [
      { key: "xanh", label: "Xanh", hex: "#4E76A3" },
      { key: "kem",  label: "Kem",  hex: "#EDE3D3" }
    ]
  },

  {
    id: "lr-bella-tay",
    name: "Túi xách tay LR Bella",
    category: "tui-xach-tay",
    folder: "Túi xách tay",
    material: "dapu",
    occasion: "dilam",
    price: 1249000,
    colors: [
      { key: "hong",  label: "Hồng",  hex: "#FBCFC0" },
      { key: "trang", label: "Trắng", hex: "#FFFFFF" }
    ]
  },
  {
    id: "lr-lyra",
    name: "Túi xách tay LR Lyra",
    category: "tui-xach-tay",
    folder: "Túi xách tay",
    material: "dathat",
    occasion: "dilam",
    price: 1435000,
    colors: [
      { key: "nau", label: "Nâu", hex: "#7A5C3E" },
      { key: "den", label: "Đen", hex: "#000" }
    ]
  },
  {
    id: "lr-grace",
    name: "Túi xách tay LR Grace",
    category: "tui-xach-tay",
    folder: "Túi xách tay",
    material: "dathat",
    occasion: "dilam",
    price: 1559000,
    colors: [
      { key: "den", label: "Đen", hex: "#000" }
    ]
  },
  {
    id: "lr-florence",
    name: "Túi xách tay LR Florence",
    category: "tui-xach-tay",
    folder: "Túi xách tay",
    material: "dathat",
    occasion: "dichoi",
    price: 1245000,
    colors: [
      { key: "do",  label: "Đỏ",  hex: "#550F14" },
      { key: "den", label: "Đen", hex: "#000" }
    ]
  },

  {
    id: "lr-classy",
    name: "Túi tote LR Classy",
    category: "tui-tote",
    folder: "Túi tote",
    material: "dathat",
    occasion: "dilam",
    price: 1295000,
    colors: [
      { key: "nau", label: "Nâu", hex: "#7A5C3E" },
      { key: "den", label: "Đen", hex: "#000" }
    ]
  },

  {
    id: "celeste-vai",
    name: "Túi đeo vai Celeste",
    category: "tui-deo-vai",
    folder: "Túi đeo vai",
    material: "dapu",
    occasion: "dilam",
    price: 949000,
    colors: [
      { key: "kem", label: "Kem", hex: "#EDE3D3" },
      { key: "den", label: "Đen", hex: "#000" }
    ]
  },

  {
    id: "nova",
    name: "Túi đeo vai Nova",
    category: "tui-deo-vai",
    folder: "Túi đeo vai",
    material: "dapu",
    occasion: "dilam",
    price: 1085000,
    rating: "5/5",
    colors: [
      { key: "nau", label: "Nâu", hex: "#7A5C3E" },
      { key: "den", label: "Đen", hex: "#000" }
    ]
  },

  {
    id: "lr-aura-cheo",
    name: "Túi đeo chéo LR Aura",
    category: "tui-deo-cheo",
    folder: "Túi đeo chéo",
    material: "canvas",
    occasion: "dichoi",
    price: 939000,
    colors: [
      { key: "xanh", label: "Xanh", hex: "#4E76A3" },
      { key: "hong", label: "Hồng", hex: "#FBCFC0" }
    ]
  },

  {
    id: "lr-elysia-cheo",
    name: "Túi đeo chéo LR Elysia",
    category: "tui-deo-cheo",
    folder: "Túi đeo chéo",
    material: "dathat",
    occasion: "dilam",
    price: 1355000,
    rating: "4.8/5",
    colors: [
      { key: "den", label: "Đen", hex: "#000" },
      { key: "do", label: "Đỏ", hex: "#550F14" }
    ]
  },
];

PRODUCT_DATA.forEach(function (product) {
  product.colors.forEach(function (color) {
    color.image = imgPath(product.folder, product.name, color.label, false);
    color.imageModel = imgPath(product.folder, product.name, color.label, true);
  });
});

const lyraBlack = PRODUCT_DATA.find(function (product) { return product.id === "lr-lyra"; })
  ?.colors.find(function (color) { return color.key === "den"; });
if (lyraBlack) {
  lyraBlack.image = "images/Túi xách tay/Túi xách tay LR Lyra - Đen.jpg";
}

const CATEGORY_LIST = [
  {
    key: "tui-xach-tay",
    label: "Túi xách tay",
    folder: "Túi xách tay",
    icon: "images/túi xách tay.png",
    banner: "images/Túi xách tay/banner.png",
    eyebrow: "Túi xách tay",
    heading: "Thanh lịch trong từng chi tiết",
    description: "Khám phá bộ sưu tập túi xách tay Lady Róse với thiết kế tinh tế, chất liệu cao cấp và gam màu trang nhã. Mỗi chiếc túi được tạo nên để tôn vinh vẻ đẹp nữ tính, hiện đại và sang trọng của người phụ nữ."
  },
  {
    key: "tui-deo-vai",
    label: "Túi đeo vai",
    folder: "Túi đeo vai",
    icon: "images/túi đeo vai.png",
    banner: "images/Túi đeo vai/banner túi đeo vai.png",
    eyebrow: "Túi đeo vai",
    heading: "Thanh lịch mỗi ngày",
    description: "Khám phá bộ sưu tập túi đeo vai Lady Róse với thiết kế thời thượng, tiện dụng và dễ dàng phối hợp cùng nhiều phong cách. Từng đường nét được chăm chút để mang đến vẻ ngoài nữ tính, hiện đại và sự tự tin trong mọi khoảnh khắc."
  },
  {
    key: "tui-deo-cheo",
    label: "Túi đeo chéo",
    folder: "Túi đeo chéo",
    icon: "images/túi đeo chéo.png",
    banner: "images/Túi đeo chéo/banner túi đeo chéo.png",
    eyebrow: "Túi đeo chéo",
    heading: "Năng động đầy cuốn hút",
    description: "Khám phá bộ sưu tập túi đeo chéo Lady Róse với kiểu dáng trẻ trung, gọn nhẹ và linh hoạt. Mỗi thiết kế là sự kết hợp hài hòa giữa thời trang và tiện ích, giúp phái đẹp luôn nổi bật, thoải mái và tự tin trên mọi hành trình."
  },
  {
    key: "tui-tote",
    label: "Túi tote",
    folder: "Túi tote",
    icon: "images/túi tote.png",
    banner: "images/Túi tote/banner túi tote.png",
    eyebrow: "Túi tote",
    heading: "Tinh giản và đẳng cấp",
    description: "Khám phá bộ sưu tập túi tote Lady Róse với không gian rộng rãi, thiết kế tối giản và vẻ đẹp hiện đại. Những chiếc túi được tạo nên dành cho người phụ nữ yêu sự thanh lịch, tiện nghi và phong cách trong nhịp sống hằng ngày."
  },
  {
    key: "vi-cam-tay",
    label: "Ví cầm tay",
    folder: "Ví cầm tay",
    icon: "images/ví cầm tay.png",
    banner: "images/Ví cầm tay/banner ví cầm tay.png",
    eyebrow: "Ví cầm tay",
    heading: "Nhỏ gọn nhưng nổi bật",
    description: "Khám phá bộ sưu tập ví cầm tay Lady Róse với thiết kế tinh tế, sang trọng và tiện dụng. Từng chi tiết được hoàn thiện tỉ mỉ nhằm tôn lên nét thanh lịch, giúp người phụ nữ thể hiện phong cách riêng trong mọi dịp đặc biệt."
  }
];

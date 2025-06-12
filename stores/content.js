// stores/content.js
export const useContentStore = defineStore("content", {
  state: () => ({
    // Navigation content
    navigation: {
      main: "ໜ້າຫຼັກ", // "Main"
      about: "ກ່ຽວກັບພວກເຮົາ", // "About Us"
      contact: "ຕິດຕໍ່ພວກເຮົາ", // "Contact"
    },

    // Footer content
    footer: {
      copyright: "© 2025 SiangLao. ສະຫງວນລິຂະສິດທັງໝົດ.",
    },

    // Initial state content (will be used in InitialState component)
    initialState: {
      title: "Convert Lao Speech to Text",
      subtitle:
        "ຖອດຂໍ້ຄວາມຈາກສຽງບັນທຶກພາສາລາວເປັນຕົວໜັງສືໄດ້ຢ່າງຖືກຕ້ອງຊັດເຈນ ດ້ວຍເຕັກໂນໂລຊີປັນຍາປະດິດ (AI) ທີ່ກ້າວໜ້າຂອງພວກເຮົາ. ",
      keyMessage:
        "ກົດປຸ່ມໄມໂຄຣໂຟນເພື່ອເລີ່ມຕົ້ນ ຫຼື ອັບໂຫຼດສຽງບັນທຶກທີ່ມີຢູ່ຂອງທ່ານ",
      recordButton: "ເລີ່ມບັນທຶກ",
      uploadButton: "ອັບໂຫຼດ",
      uploadText: "ຫຼື ລາກຟາຍສຽງມາໃສ່ບ່ອນນີ້",
    },

    // Transcription interface content
    transcription: {
      timeRecorded: "ເວລາບັນທຶກ:",
      aiConfidence: "ຄວາມເຊື່ອໝັ້ນ:",
      placeholderText: "ລໍຖ້າການບັນທຶກສຽງ ຫຼື ການອັບໂຫຼດຟາຍ.",
      copyButton: "ກັອບປີ້ຂໍ້ຄວາມ",
      downloadButton: "ດາວໂຫຼດ",
      processingText: "ກຳລັງດຳເນີນການ...",
      processingSubtext: "ກຳລັງວິເຄາະສຽງ",
    },

    about: {
      subTitle: " ເຊື່ອມຕໍ່ຊ່ອງວ່າງການສື່ສານດ້ວຍເທັກໂນໂລຊີປ່ຽນສຽງເປັນຂໍ້ຄວາມທີ່ທັນສະໄໝສຳລັບພາສາລາວ",
      thesisIntroductionFirst: "SiangLao ເປັນຕົວແທນຂອງຄວາມກ້າວໜ້າທີ່ສຳຄັນໃນເຕັກໂນໂລຊີພາສາ ແລະ ໄດ້ແກ້ໄຂຄວາມຕ້ອງການທີ່ສຳຄັນ ສຳລັບການຮັບຮູ້ສຽງເວົ້າທີ່ ຊັດເຈນໃນພາສາລາວ. ໂຄງການບົດຈົບຊັ້ນຂອງພວກເຮົາປະສົມປະສານລະບົບການຮຽນຮູ້ເຄື່ອງຈັກທີ່ກ້າວໜ້າກັບຄວາມຊ່ຽວຊານດ້ານພາສາສາດ ເພື່ອສ້າງລະບົບປ່ຽນສຽງເປັນຂໍ້ຄວາມທີ່ເຊື່ອຖືໄດ້ ພ້ອມທັງໄດ້ຮັບການປັບປຸງໂດຍສະເພາະ ສຳລັບການອອກສຽງ ແລະ ໄວຍາກອນຂອງພາສາລາວ",
      thesisIntrodictionSecond: "ໂດຍການພັດທະນາເຕັກໂນໂລຊີສະເພາະດ້ານນີ້ພວກເຮົາໄດ້ຕັ້ງເປົ້າໝາຍທີ່ຈະຜ່ານຜ່າ ສິ່ງທ້າທາຍຕ່າງໆທີ່ໃນອະດີດໄດ້ຈຳກັດການເຂົ້າເຖິງ ດ້ານດິຈິຕອນສຳລັບຜູ້ເວົ້າພາສາລາວ ພ້ອມທັງສ້າງໂອກາດໃໝ່ໆທາງດ້ານການສຶກສາ, ທຸລະກິດ ແລະ ການປົກປັກຮັກສາມໍລະດົກທາງວັດທະນະທຳ ໃນໂລກດິຈິຕອນທີ່ນັບມື້ນັບຂະຫຍາຍຕົວ.",
      goalFirst: "ພວກເຮົາທຸ່ມເທ ແລະ ມຸ່ງໝັ້ນໃນການເສີມສ້າງຄວາມເຂັ້ມແຂງໃຫ້ແກ່ຜູ້ເວົ້າພາສາລາວທົ່ວໂລກ ດ້ວຍເຕັກໂນໂລຊີ ການແປງສຽງເປັນຂໍ້ຄວາມທີ່ໃຊ້ງານງ່າຍ ແລະ ມີຄວາມຊັດເຈນເຊິ່ງຈະຊ່ວຍຫຼຸດຜ່ອນຊ່ອງຫວ່າງທາງການສື່ສານ ແລະ ສົ່ງເສີມການມີສ່ວນຮ່ວມໃນໂລກດິຈິຕອນ. ພາລະກິດຂອງພວກເຮົາແມ່ນການພັດທະນາ ວິທີແກ້ໄຂ ທີ່ເຄົາລົບ ຕໍ່ລັກສະນະສະເພາະອັນເປັນເອກະລັກຂອງພາສາລາວ, ພ້ອມທັງເຮັດໃຫ້ເຕັກໂນໂລຊີການຮັບຮູ້ສຽງເວົ້າ ສາມາດ ເຂົ້າເຖິງໄດ້ງ່າຍຕໍ່ກັບນັກ ຮຽນນັກສຶກສາ, ຜູ້ປະກອບອາຊີບ ແລະ ທຸກໆຄົນທີ່ສື່ສານເປັນພາສາລາວ.",
      goalSecond: "ໂດຍຜ່ານການປັບປຸງຢ່າງຕໍ່ເນື່ອງ ພວກເຮົາສູ້ຊົນໃຫ້ໄດ້ເປັນແພລດຟອມການແປງສຽງເປັນຂໍ້ຄວາມຊັ້ນນຳ ສຳລັບຜູ້ເວົ້າພາສາລາວ ເພື່ອເສີມສ້າງຄຸນນະພາບຊີ ວິດ ແລະ ເຊື່ອມສຳພັນຊຸມຊົນ ດ້ວຍເຕັກໂນໂລຊີທີ່ເຂົ້າໃຈພາສາ ຂອງພວກເຂົາຢ່າງແທ້ຈິງ.",
      team: "ທີມງານຂອງພວກເຮົາ ໄດ້ປະສານສົມທົບຄວາມຊ່ຽວຊານດ້ານປັນຍາປະດິດ ແລະ ການອອກແບບປະສົບການຜູ້ໃຊ້ ເພື່ອສ້າງໂຊລູຊັນການແປງສຽງເປັນ ຂໍ້ຄວາມທີ່ລາບລື່ນ ບໍ່ຕິດຂັດ ໂດຍສະເພາະສຳລັບພາສາລາວ. ພວກເຮົາຖືກເຊື່ອມ ໂຍງເຂົ້າກັນດ້ວຍຄວາມມັກຮັກອັນແຮງກ້າຂອງພວກເຮົາຕໍ່ກັບ ເຕັກໂນໂລຊີພາສາ ແລະ ຄວາມມຸ່ງໝັ້ນຂອງພວກເຮົາໃນການ ເຮັດໃຫ້ເຄື່ອງມືດິຈິຕອນຕ່າງໆເຂົ້າເຖິງໄດ້ງ່າຍຂຶ້ນ.",
      advisor: {
        name: "Somsack Inthasone PhD",
        role: "ອາຈານທີ່ປຶກສາ",
      },
      student1: {
        name: "Souphaxay Naovalath",
        role: "ນັກສຶກສາ",
      },
      student2: {
        name: "Sounme Chanthavong",
        role: "ນັກສຶກສາ",
      },
    },

    // Error messages
    errors: {
      validation: {
        title: "ປະເພດຂອງຟາຍບໍ່ຖືກຕ້ອງ",
        subtitle: "ຟາຍນີ້ບໍ່ສາມາດໃຊ້ໄດ້ ກະລຸນາເລືອກຟາຍໃໝ່",
        message: "ປະເພດຂອງຟາຍບໍ່ຖືກຕ້ອງ. ກະລຸນາເລືອກຟາຍໃໝ່",
      },
      processing: {
        title: "ການປະມວນຜົນບໍ່ສຳເລັດ",
        subtitle: "ການປະມວນຜົນລົ້ມເຫຼວ ກະລຸນາລອງໃໝ່ ຫຼື ກວດສອບຄຸນນະພາບສຽງ",
        message:
          "ບໍ່ສາມາດປະມວນຜົນສຽງໄດ້. ບັນຫານີ້ອາດເກີດຈາກຄຸນນະພາບສຽງ ຫຼື ບັນຫາດ້ານເຕັກນິກ",
      },
    },
  }),

  getters: {
    // Helper getters for easy access
    getNavigationLabel: (state) => (key) => {
      return state.navigation[key] || key;
    },

    getCopyrightText: (state) => state.footer.copyright,

    getInitialStateContent: (state) => state.initialState,

    getTranscriptionContent: (state) => state.transcription,

    getAboutContent: (state) => state.about,

    getErrorContent: (state) => (type) => state.errors[type],
  },

  actions: {
    // Future: methods to update content dynamically if needed
    updateContent(section, key, value) {
      if (this[section] && this[section][key] !== undefined) {
        this[section][key] = value;
      }
    },
  },
});

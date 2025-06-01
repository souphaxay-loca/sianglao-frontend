// stores/content.js
export const useContentStore = defineStore('content', {
    state: () => ({
      // Navigation content
      navigation: {
        main: "ໜ້າຫຼັກ",           // "Main" 
        about: "ກ່ຽວກັບພວກເຮົາ",    // "About Us"
        contact: "ຕິດຕໍ່ພວກເຮົາ"          // "Contact"
      },
      
      // Footer content
      footer: {
        copyright: "© 2025 SiangLao. ສະຫງວນລິຂະສິດທັງໝົດ."
      },
      
      // Initial state content (will be used in InitialState component)
      initialState: {
        title: "Convert Lao Speech to Text",
        subtitle: "ກູດລວມການບັນທຶກສຽງພາສາລາວເປັນຂໍ້ຄວາມດ້ວຍເທັກໂນໂລຊີ AI ທີ່ກ້າວໜ້າ ກົດປຸ່ມໄມໂຄຣໂຟນເພື່ອເລີ່ມຕົ້ນ ຫຼື ອັບໂຫຼດໄຟລ໌ບັນທຶກສຽງທີ່ມີຢູ່ແລ້ວ.",
        recordButton: "ເລີ່ມບັນທຶກ",
        uploadButton: "ອັບໂຫຼດໄຟລ໌",
        uploadText: "ຫຼື ລາກແລະວາງ"
      },
      
      // Transcription interface content
      transcription: {
        timeRecorded: "ເວລາທີ່ບັນທຶກ:",
        aiConfidence: "ຄວາມເຊື່ອໝັ້ນຂອງ AI:",
        placeholderText: "ສັງກາການບັນທຶກສຽງ ຫຼື ການອັບໂຫຼດໄຟລ໌...\n\n(Your transcribed text will appear here after recording or upload.)",
        copyButton: "ກັອບປີ້ຂໍ້ຄວາມ",
        downloadButton: "ດາວໂຫຼດ",
        processingText: "ກຳລັງດຳເນີນການ...",
        processingSubtext: "ກຳລັງວິເຄາະສຽງ"
      },
      
      // Error messages (for future use)
      errors: {
        fileNotSupported: "ໄຟລ໌ບໍ່ຮອງຮັບ",
        processingFailed: "ການດຳເນີນການລົ້ມເຫຼວ",
        networkError: "ມີບັນຫາການເຊື່ອມຕໍ່"
      }
    }),
  
    getters: {
      // Helper getters for easy access
      getNavigationLabel: (state) => (key) => {
        return state.navigation[key] || key
      },
      
      getCopyrightText: (state) => state.footer.copyright,
      
      getInitialStateContent: (state) => state.initialState,
      
      getTranscriptionContent: (state) => state.transcription
    },
  
    actions: {
      // Future: methods to update content dynamically if needed
      updateContent(section, key, value) {
        if (this[section] && this[section][key] !== undefined) {
          this[section][key] = value
        }
      }
    }
  })
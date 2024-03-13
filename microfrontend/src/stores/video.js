import { reactive, ref } from "vue";
import { defineStore } from "pinia";
 
export const useVideo = defineStore("video", () => {
  const errors = reactive({});
  const dataVideo = reactive({});
  const loading = ref(false);
  const isHidden = ref(true);
  const textOCR = ref('');
  const form = reactive({
    link: ""
  });
 
  function resetForm() {
    form.link = "";
  }
 
  async function handleSubmit() {
    isHidden.value = false;
    if (loading.value) return;
 
    loading.value = true;
    errors.value = {};
 
    return window.axios
      .post("video", form)
      .then(() => {
        this.resetForm();
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(async () => {
        await getData();
        loading.value = false;
        isHidden.value = true;
      });
  }

  async function getData() {
    return window.axios
      .get("video")
      .then((response) => {
        const pixels = response.data.resolution.split('x')
        dataVideo.value = { ...response.data, height: pixels[1], width: pixels[0] } 
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        loading.value = false;
      });
  }

  async function getTranscript() {
    isHidden.value = false;
    return window.axios
      .get("video/transcript")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(async () => {
        await getData();
        isHidden.value = true;
      });
  }

  async function runOCR() {
    isHidden.value = false;
    return window.axios
      .get("video/ocr")
      .then((response) => {
        textOCR.value = response.data.textImg
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        isHidden.value = true;
      });
  }

  async function loadingAction(x) {
    if (loading.value) return;
 
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, x*1000);
  }

  async function clickDownload(id) {
    loadingAction(5)
    const tagDownload = document.getElementById(id);
    tagDownload.click()
  }
 
  return { form, errors, loading, resetForm, getData, handleSubmit, dataVideo, getTranscript, runOCR, textOCR, isHidden, clickDownload};
});
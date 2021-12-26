<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div ref="toast" :class="['toast align-items-center text-white border-0', toastType ]" aria-atomic="true"
         aria-live="assertive"
         role="alert">
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button aria-label="Close" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                type="button"></button>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from "bootstrap";

export default {
  name: "Toast",
  data()
  {
    return {
      message: "",
      type: "success",
      availableTypes: ["success", "error"]
    };
  },
  methods: {
    showToast(toastMessage = "default message", type = "success")
    {
      if (this.availableTypes.includes(type))
      {
        this.type = type;
        this.message = toastMessage;
        const toast = new Toast(this.$refs.toast);
        toast.show();
      } else
      {
        this.showToast(`Not supported type: ${type}`, "error");
      }
    }
  },
  computed: {
    toastType()
    {
      if (this.type === "error")
      {
        return "bg-danger";
      }
      return "bg-success";
    }
  }
};
</script>

<style scoped>

</style>

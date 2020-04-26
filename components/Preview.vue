<template>
  <div>
    <a-button type="primary" @click="showModal">选项</a-button>
    <a-modal
      title="选项"
      :visible="visible"
      footer=""
      :width="700"
      @cancel="handleCancel"
    >
      <v-jsoneditor
        v-model="json"
        :options="options"
        :plus="false"
        :height="'400px'"
      />
      <a-button type="primary" @click="optionSubmit">设置</a-button>
      <a-button @click="handleCancel">关闭</a-button>
    </a-modal>
    <main class="simulator" @click="showModal">
      <header class="simulator__header-bar">
        <div class="bar__operator">中国移动</div>
        <div class="bar__time">19:01:30</div>
        <div class="bar__battery">100%</div>
      </header>
      <section class="simulator__url">
        <input type="text" :value="src" />
      </section>
      <div class="doc-simulato">
        <iframe
          :src="src"
          scrolling="auto"
          frameborder="0"
          height="715"
          width="420"
          class="simulator__preview"
        ></iframe>
      </div>
    </main>
  </div>
</template>
<script>
import VJsoneditor from "v-jsoneditor/src/index";

export default {
  name: "Preview",
  props: {
    src: {
      type: String,
    },
  },
  components: {
    VJsoneditor,
  },
  data: () => ({
    json: {},
    options: {},
    visible: false,
  }),
  mounted() {
    if (this.$frontmatter && this.$frontmatter.defaultData) {
      this.$set(this, "json", this.$frontmatter.defaultData);
    }
  },
  methods: {
    handleCancel() {
      this.visible = false;
    },
    showModal() {
      this.visible = true;
    },
    optionSubmit() {
      document
        .getElementsByClassName("simulator__preview")[0]
        .contentWindow.postMessage({ type: "setData", value: this.json }, "*");
      this.visible = false;
    },
    onJsonChange(value) {
      console.log("value:", value);
    },
  },
};
</script>
<style lang="less" scoped>
.simulator {
  background: #fff;
  // position: fixed;
  // top: 150px;
  // right: 50px;
  min-width: 320px;
  border: 1px solid #eee;
  overflow: hidden;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  &__header-bar {
    padding: 5px;
    display: flex;
    align-items: center;
    > .bar {
      &__operator {
        flex: 1;
        font-size: 12px;
      }
      &__time {
        flex: 1;
        font-size: 12px;
      }
      &__battery {
        width: 40px;
        font-size: 12px;
        justify-self: center;
        text-align: center;
        background: #ccc;
        color: #fff;
        position: relative;
      }
    }
  }
  &__url {
    padding: 5px;
    margin: 0 5px;
    background: #eee;
    input {
      width: 100%;
      border: 0;
      background: transparent;
      outline: none;
      padding: 2px 5px;
    }
  }
  &__preview {
    margin-top: 5px;
    border-top: 1px solid #eee;
  }
}
</style>

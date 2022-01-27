<script>
import { cloneDeep, isEqual } from "lodash";
export default {
  data() {
    return {
      isOpen: false,
      formValue: [],
      state: {
        recalculateButton: "disabled",
      },
    };
  },
  created() {
    this.formValue = this.inputValue;
  },
  props: {
    dots: {
      type: Object,
    },
  },
  computed: {
    inputValue() {
      return this.dots.inputValue;
    },
  },
  methods: {
    addNewDot() {
      this.formValue.push({ x: 0, y: 0 });
    },
    deleteDot(index) {
      this.formValue.splice(index, 1);
    },
    setNewValues() {
      const newValues = this.formValue.map((val) => ({
        x: parseInt(val.x),
        y: parseInt(val.y),
      }));
      this.dots.setNewValue(newValues);
    },
  },
  watch: {
    inputValue() {
      this.formValue = cloneDeep(this.inputValue);
    },
    formValue: {
      handler: function () {
        this.state.recalculateButton = isEqual(this.formValue, this.inputValue)
          ? "disabled"
          : "active";
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <button v-if="!isOpen" class="open-button" @click="isOpen = !isOpen">
      Add dots
    </button>
    <div v-else class="form">
      <div class="dot-wrapper">
        <div class="dot-field" v-for="(dot, index) in formValue" :key="index">
          <div class="dot-idx">{{ index + 1 }}.</div>
          <div class="dot-coord">X:</div>
          <input class="dot-input" v-model="dot.x" type="number" min="0" />
          <div class="dot-coord">Y:</div>
          <input class="dot-input" v-model="dot.y" type="number" min="0" />
          <button class="delete-btn" @click="deleteDot(index)">Delete</button>
        </div>
        <button class="add-button" @click="addNewDot">Add dot</button>
      </div>
      <button
        class="recal-button"
        :class="{ active: state.recalculateButton === 'active' }"
        @click="setNewValues"
      >
        Calculate
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  width: 400px;
  height: 100%;
  display: flex;
  align-items: center;
}
.form {
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  height: 100%;
  background: #efefef;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
}
.open-button {
  width: 100%;
  padding: 15px;
  cursor: pointer;
  color: #ffffff;
  background: rgb(109, 204, 0);
  font-size: 24px;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  transition: 0.2s;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  &:hover {
    background: rgb(79, 148, 0);
  }
}
.dot {
  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow: auto;
  }
  &-field {
    display: flex;
    gap: 10px;
    align-items: center;
    .delete-btn {
      visibility: hidden;
      opacity: 0;
      color: #ffffff;
      padding: 5px;
      border-radius: 3px;
      margin-left: 10px;
      width: 100%;
      justify-self: flex-end;
      background: rgb(248, 97, 70);
      transition: 0.2s;
      &:hover {
        background: rgb(223, 84, 59);
      }
    }
    &:hover {
      .delete-btn {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  &-input {
    padding: 5px;
    border-radius: 3px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.02);
    color: rgb(102, 102, 102);
    width: 50px;
  }
}
.add-button,
.recal-button {
  width: 100%;
  padding: 8px;
  cursor: pointer;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  transition: 0.2s;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
}
.add-button {
  background: rgb(109, 204, 0);
  &:hover {
    background: rgb(79, 148, 0);
  }
}
.recal-button {
  background: rgb(211, 211, 211);
  pointer-events: none;
  &.active {
    background: rgb(109, 204, 0);
    pointer-events: auto;
    &:hover {
      background: rgb(79, 148, 0);
    }
  }
}
</style>

<template lang="pug">
.container
  .form
    .inputs.up
      .box(:class="{empty: dayError}")
        label(for="day") day
        input.up(type="number", v-model="day", placeholder="dd")
        Transition
          p.error(v-if="dayError") {{ dayError }}
      .box(:class="{empty: monthError}")
        label(for="month") month
        input.up(type="number", v-model="month", placeholder="mm")
        Transition
          p.error(v-if="monthError") {{ monthError }}
      .box(:class="{empty: yearError}")
        label(for="year") year
        input.up(type="number", v-model="year", placeholder="yyyy")
        Transition
          p.error(v-if="yearError") {{ yearError }}
    Transition
      .error(v-if="error") {{ error }}
    .submit 
      span.line
      .button(@click="calculate")
        //- font-awesome-icon(icon="caret-down")
        //- font-awesome-icon(icon="fas fa-user-secret")
        font-awesome-icon.icon(icon="fas fa-angles-down")
        //- img(src="../puplic/icon-arrow.svg")
  .results 
    .years 
      span.value(ref="years") --
      span.title years
    .months 
      span.value(ref="months") --
      span.title months
    .days 
      span.value(ref="days") --
      span.title days
</template>
<script>
export default {
  data() {
    return {
      year: null,
      month: null,
      day: null,
      monthsDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      validation: true,
      ageWithYears: null,
      error: null,
      dayError: null,
      monthError: null,
      yearError: null,
    };
  },
  methods: {
    checkValidate() {
      console.log("check running");
      let inputs = [...document.querySelectorAll("input")];
      this.validation = true;
      this.dayError = null;
      this.monthError = null;
      this.yearError = null;
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
          this.validation = false;
          inputs[i].parentElement.classList.add("empty");
          if (i > 1) {
            this.yearError = "This field is required";
          } else if (i > 0) {
            this.monthError = "This field is required";
          } else {
            this.dayError = "This field is required";
          }
        }
      }
    },
    calculate() {
      this.checkValidate();
      if (this.validation) {
        let today = new Date(),
          thisMonth = today.getMonth() + 1,
          birthday = new Date(`${this.month}-${this.day}-${this.year}`),
          ageWithDays = Math.floor((today - birthday) / 1000 / 60 / 60 / 24);
        console.log("ageWithDays: ", ageWithDays);
        if (ageWithDays >= 0 && !isNaN(ageWithDays)) {
          //calc years
          this.error = null;
          this.ageWithYears = Math.floor(ageWithDays / 365);
          this.$refs.years.textContent = this.ageWithYears;
          let leftMonths = 0;
          //calc months
          if (this.month > thisMonth) {
            leftMonths = this.month - thisMonth;
          } else if (thisMonth > this.month) {
            leftMonths = thisMonth - this.month;
          }
          this.$refs.months.textContent = this.ageWithYears * 12 + leftMonths;
          //calc days
          this.$refs.days.textContent = ageWithDays;
        } else {
          this.reset();
          if (this.year > today.getFullYear()) {
            this.yearError = "Must be in the past";
          }
          if (this.month > 12 || this.month <= 0) {
            this.monthError = "Must be a valid month";
          }
          if (
            this.day <= 0 ||
            this.day > this.monthsDays[this.month - 1] ||
            this.day > 31
          ) {
            this.dayError = "Must be a valid day";
          }
        }
      }
    },
    reset() {
      this.$refs.years.textContent = "--";
      this.$refs.months.textContent = "--";
      this.$refs.days.textContent = "--";
    },
  },
};
</script>
<style lang="scss">
//Start Global
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,800&display=swap");
:root {
  --purple: hsl(259, 100%, 65%);
  --lightRed: hsl(0, 100%, 67%);
  --white: hsl(0, 0%, 100%);
  --offWhite: hsl(0, 0%, 94%);
  --lightGray: hsl(0, 0%, 86%);
  --smokeyGrey: hsl(0, 1%, 44%);
  --offBlack: hsl(0, 0%, 8%);
  --smallSize: 10px;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: "Poppins", sans-serif;
}
.up {
  text-transform: uppercase;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: 0.6s;
}
//End Global
#app {
	position: relative;
	padding: 20px 0;
	background-color: var(--offWhite);
	height: 100vh;
}
.container {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	background-color: var(--white);
	border-radius: 10px 10px 100px;
	padding: 20px;
	@media (min-width: 768px) {
		top: 50%;
		width: 440px;
		transform: translate(-50%, -50%);
  }
}
.form {
  .inputs {
    display: flex;
    gap: 20px;
    .box {
      transition: 0.3s;
      position: relative;
      input {
        display: block;
        max-width: 90px;
        padding: 8px;
        border: 1px solid var(--offWhite);
        border-radius: 5px;
        color: var(--offBlack);
        font-weight: 800;
        font-size: 16px;
        cursor: pointer;
        caret-color: var(--purple);
        &::placeholder {
          color: var(--smokeyGrey);
        }
        &:hover,
        &:focus {
          border-color: var(--purple);
          outline: none;
        }
        @media (max-width: 1439px) {
          width: 25vw;
        }
      }
      label {
        letter-spacing: 2px;
        color: var(--smokeyGrey);
        font-size: var(--smallSize);
      }
      &.empty {
        &,
        label {
          color: var(--lightRed);
        }
        input {
          border-color: var(--lightRed);
        }
      }
      .error {
        position: absolute;
        bottom: -3px;
        font-style: italic;
        white-space: nowrap;
        letter-spacing: 0;
        font-size: 8px;
        text-transform: none;
        @media (min-width: 768px) {
          font-size: 9px;
        }
      }
    }
  }
  .error {
    color: var(--lightRed);
    font-weight: 400;
    font-size: var(--smallSize);
    margin: 10px 0 -15px;
  }
  .submit {
    --size: 50px;
    position: relative;
    display: flex;
    align-items: center;
    max-width: 380px;
    margin: 50px 0 45px;
    transition: 0.3s;
    @media (min-width: 768px) {
      margin: 20px 0 0;
    }
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      right: 0;
      background-color: var(--purple);
      border-radius: 50%;
      width: var(--size);
      height: var(--size);
      cursor: pointer;
      img {
        width: 50%;
      }
      &:hover {
        background-color: var(--offBlack);
        .icon {
          transform: translateY(2px);
        }
      }
      @media (max-width: 767px) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .icon {
        color: #fff;
        font-size: 18px;
        transition: 0.3s;
      }
    }
    .line {
      width: 100%;
      height: 2px;
      background-color: var(--offWhite);
      @media (min-width: 768px) {
        width: calc(100% - var(--size));
      }
    }
  }
}
.results {
  font-size: 32px;
  font-weight: 800;
  font-style: italic;
  .value {
    color: var(--purple);
    letter-spacing: 4px;
    transition: 0.3s;
  }
}
</style>

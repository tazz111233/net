document.addEventListener("DOMContentLoaded", () => {
    const billInput = document.getElementById("bill");
    const peopleInput = document.getElementById("people");
    const tipButtons = document.querySelectorAll(".tip-button");
    const customTipButton = document.querySelector(".custom-tip");
    const tipAmountDisplay = document.querySelector(".tip-amount .amount");
    const totalAmountDisplay = document.querySelector(".total-amount .amount");
    const resetButton = document.querySelector(".reset-button");

    let billValue = 0;
    let peopleValue = 1;
    let tipPercentage = 0;

    billInput.addEventListener("input", () => {
        billValue = parseFloat(billInput.value) || 0;
        calculateTip();
    });

    peopleInput.addEventListener("input", () => {
        peopleValue = parseInt(peopleInput.value) || 1;
        calculateTip();
    });

    tipButtons.forEach(button => {
        button.addEventListener("click", () => {
            tipButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            tipPercentage = parseFloat(button.innerText) / 100;
            calculateTip();
        });
    });

    customTipButton.addEventListener("click", () => {
        const customTip = prompt("Enter custom tip percentage:");
        if (customTip !== null) {
            tipPercentage = parseFloat(customTip) / 100 || 0;
            tipButtons.forEach(btn => btn.classList.remove("active"));
            calculateTip();
        }
    });

    resetButton.addEventListener("click", () => {
        billInput.value = "0";
        peopleInput.value = "1";
        tipButtons.forEach(btn => btn.classList.remove("active"));
        customTipButton.classList.remove("active");
        billValue = 0;
        peopleValue = 1;
        tipPercentage = 0;
        updateDisplay(0, 0);
    });

    function calculateTip() {
        if (billValue > 0 && peopleValue > 0) {
            const tipAmount = (billValue * tipPercentage) / peopleValue;
            const totalAmount = (billValue + billValue * tipPercentage) / peopleValue;
            updateDisplay(tipAmount, totalAmount);
        } else {
            updateDisplay(0, 0);
        }
    }

    function updateDisplay(tip, total) {
        tipAmountDisplay.innerText = `$${tip.toFixed(2)}`;
        totalAmountDisplay.innerText = `$${total.toFixed(2)}`;
    }
});

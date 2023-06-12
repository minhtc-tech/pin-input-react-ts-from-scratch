import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";

interface PinInputProps {
  length: number;
  onComplete: (pin: string) => void;
  validatePattern: RegExp;
  isSecret?: boolean;
  defaultValue?: string;
  isDisable?: boolean;
}

const PinInput: React.FC<PinInputProps> = ({
  length,
  onComplete,
  validatePattern,
  isSecret = false,
  defaultValue = "",
  isDisable = false,
}) => {
  const isMounted = useRef(false);

  const [pinValues, setPinValues] = useState<string[]>(
    Array(length)
      .fill("")
      .map((_, index) => defaultValue[index] || "")
  );
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const enteredPin = pinValues.join("");
    if (enteredPin.length === length) {
      onComplete(enteredPin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinValues]);

  const handlePinChange = (index: number, value: string) => {
    if (value.length === 2) {
      const removedIndex = value.indexOf(pinValues[index]);
      value = value.slice(0, removedIndex) + value.slice(removedIndex + 1);
    }

    if (!validatePattern.test(value)) {
      return;
    }

    const newPin = [...pinValues];
    newPin[index] = value;
    setPinValues(newPin);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedData = event.clipboardData.getData("text");
    const sanitizedData = pastedData.slice(0, length);

    const newPin = Array(length).fill("");
    for (let i = 0; i < sanitizedData.length; i++) {
      newPin[i] = sanitizedData[i];
    }
    setPinValues(newPin);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      if (pinValues[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newInputValues = [...pinValues];
        newInputValues[index] = "";
        setPinValues(newInputValues);
      }
    }
  };

  return (
    <div className={styles.pinInput} data-testid="pin-input">
      {pinValues.map((value, index) => (
        <input
          className={styles.pinInputField}
          key={index}
          maxLength={2}
          type={isSecret ? "password" : "text"}
          value={value}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onChange={(event) => handlePinChange(index, event.target.value)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
          disabled={isDisable}
          placeholder="O"
        />
      ))}
    </div>
  );
};

export default PinInput;

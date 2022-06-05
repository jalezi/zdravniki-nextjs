/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled, { css } from "styled-components";

import useOutsideClick from "../../hooks/useOutsideClick";

const LANGUAGES_MAP = {
  sl: "Slovenščina",
  en: "English",
  it: "Italiano",
};

export const baseInput = css`
  padding-block: 4px;
  padding-left: 4px;
  padding-right: 0;
  border-radius: 4px;
  width: 100%;
  color: ${(props) => props.theme.textColor2};
  ${(props) => props.theme.medium_14};
  ${(props) => {
    if (props.error)
      return css`
        border: solid ${props.theme.error} 1px;
      `;
    return css`
      border: solid ${props.theme.textColor2} 1px;
      &:focus {
        border: solid ${props.theme.texColor1} 1px;
        color: ${props.theme.textColor1};
      }
    `;
  }}

  outline: none;
`;

const Container = styled.div`
  .hidden {
    display: none;
  }

  min-width: 45px;

  .custom-select-wrapper {
    position: relative;
    user-select: none;
    width: 100%;
  }
  .custom-select {
    ${baseInput}
    background: transparent;
    position: relative;
    cursor: pointer;
    color: ${(props) => props.theme.textColor2};
  }
  .custom-select__trigger {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  .custom-options {
    position: absolute;
    display: none;
    top: 100%;
    left: -110%;
    right: 0;
    background: ${(props) => props.theme.bgColor1};
    transition: all 5s;
    pointer-events: none;
    z-index: 2;
    padding: 8px;
    width: fit-content;
    max-height: 200px;
    overflow-y: auto;
  }
  .custom-select.open .custom-options {
    display: block;
    pointer-events: all;
    margin-top: 8px;
    box-shadow: -1px 1px 2px rgba(67, 70, 74, 0.0001),
      -2px 2px 5px rgba(67, 86, 100, 0.123689);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
  }
  .custom-option {
    position: relative;
    display: block;
    padding: 4px;
    cursor: pointer;
    transition: all 0.5s;
    color: ${(props) => props.theme.textColor1};
    /* margin-bottom: 12px; */
    /* height: 32px; */
  }
  padding-block: 4px;

  .option-container {
    width: 100%;
    text-align: right;
  }

  .option-container:hover {
    .custom-option {
      cursor: pointer;
      background-color: ${(props) => props.theme.grey6};
    }
  }

  .custom-option.selected {
    color: ${(props) => props.theme.textColor1};
    background-color: ${(props) => props.theme.grey4};
  }

  .arrow {
    position: relative;
    height: 7.72px;
    width: 12.26px;
    margin-left: 8px;
  }
  .arrow::before,
  .arrow::after {
    content: "";
    position: absolute;
    bottom: 0px;
    width: 0.15rem;
    height: 100%;
    transition: all 0.5s;
  }
  .arrow::before {
    left: -2px;
    transform: rotate(-45deg);
    background-color: ${(props) => props.theme.textColor2};
  }
  .arrow::after {
    left: 2px;
    transform: rotate(45deg);
    background-color: ${(props) => props.theme.textColor2};
  }
  .open .arrow::before {
    left: -2px;
    transform: rotate(45deg);
  }
  .open .arrow::after {
    left: 2px;
    transform: rotate(-45deg);
  }
`;

export default function LanguageSelector() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(router.locale);

  const hiddenInputRef = useRef();
  const customSelectRef = useRef();
  useOutsideClick(customSelectRef, () => {
    setIsOpen(false);
  });

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: { lngSelector: router.locale },
  });
  const options = router.locales
    .filter((lng) => lng !== "default")
    .map((lng) => ({ value: lng, label: LANGUAGES_MAP[lng] }));

  const onSubmit = (data) => {
    router.push(router.pathname, router.pathname, { locale: data.lngSelector });
  };

  const onLngChange = (e, value) => {
    setSelected(value);
    setValue("lngSelector", value);
    hiddenInputRef.current.click();
  };

  // TODO: where should I put "aria-label='Selected language: English'"
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="lngSelector"
        defaultValue={router.locale}
        render={({ field: { value, name } }) => (
          <Container>
            <select
              id={name}
              name={name}
              value={value}
              onChange={onLngChange}
              className="hidden"
            >
              {options.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <div
              ref={customSelectRef}
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              className="custom-select-wrapper"
            >
              <div className={`custom-select ${isOpen && "open"}`}>
                <div className="custom-select__trigger">
                  <span>
                    {options
                      .find((item) => item.value === selected)
                      ?.value.toUpperCase() || "Select"}
                  </span>
                  <div className="arrow" />
                </div>
                <div className="custom-options" role="menuitem" tabIndex="0">
                  {options.map((item) => (
                    <div
                      key={item.value}
                      onClick={(e) => {
                        onLngChange(e, item.value);
                      }}
                      className="option-container"
                    >
                      <span
                        className={`custom-option ${
                          selected === item.value && "selected"
                        } `}
                        data-value={item.value}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        )}
      />

      <input ref={hiddenInputRef} type="submit" hidden />
    </form>
  );
}

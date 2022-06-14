import { useRouter } from "next/router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import { theme as appTheme } from "../../constants/theme";

import { customStyles } from "./styles";

const LANGUAGES_MAP = {
  sl: "Slovenščina",
  en: "English",
  it: "Italiano",
};

export default function LanguageSelector() {
  const router = useRouter();
  const hiddenInputRef = useRef();

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: { lngSelector: router.locale },
  });

  const options = router.locales
    .filter((lng) => lng !== "default")
    .map((lng) => ({ value: lng, label: LANGUAGES_MAP[lng] }));

  const onSubmit = (data) => {
    router.push(router.pathname, router.pathname, { locale: data.lngSelector });
  };

  const onLngChange = (option) => {
    setValue("lngSelector", option.value);
    hiddenInputRef.current.click();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="lngSelector"
        defaultValue={router.locale}
        render={({ field: { value, name, onBlur } }) => (
          <Select
            menuPlacement="auto"
            id="lang-selector"
            instanceId="lang-selector"
            options={options}
            defaultValue={{ value, label: LANGUAGES_MAP[value] }}
            name={name}
            onChange={onLngChange}
            onBlur={onBlur}
            formatOptionLabel={(option, { context }) =>
              context === "value" ? option.value.toUpperCase() : option.label
            }
            aria-label={`Selected language: ${LANGUAGES_MAP[value]}`}
            isSearchable={false}
            styles={customStyles}
            theme={(reactSelectTheme) => ({
              ...reactSelectTheme,
              appTheme,
              colors: {
                ...reactSelectTheme.colors,
              },
            })}
          />
        )}
      />

      <input ref={hiddenInputRef} type="submit" hidden />
    </form>
  );
}

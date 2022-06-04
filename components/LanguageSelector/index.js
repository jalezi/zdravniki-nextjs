import { useRouter } from "next/router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";

// const LANGUAGES_MAP = {
//   sl: "Slovenščina",
//   en: "English",
//   it: "Italiano",
// };

export default function LanguageSelector() {
  const hiddenInputRef = useRef();

  const router = useRouter();
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: { lngSelector: router.locale },
  });
  const locales = router.locales.filter((lng) => lng !== "default");

  const onSubmit = (data) => {
    router.push(router.pathname, router.pathname, { locale: data.lngSelector });
  };

  const onLngChange = (e) => {
    setValue("lngSelector", e.target.value);
    hiddenInputRef.current.click();
  };

  // TODO: where should I put "aria-label='Selected language: English'"
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="lngSelector"
        defaultValue={router.locale}
        render={({ field: { value, name, onBlur } }) => (
          <select
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onLngChange}
          >
            {locales.map((lng) => (
              <option key={lng} value={lng}>
                {lng.toUpperCase()}
              </option>
            ))}
          </select>
        )}
      />

      <input ref={hiddenInputRef} type="submit" hidden />
    </form>
  );
}

import { useRouter } from "next/router";
import { useRef } from "react";
import { useForm } from "react-hook-form";

// const LANGUAGES_MAP = {
//   sl: "Slovenščina",
//   en: "English",
//   it: "Italiano",
// };

export default function LanguageSelector() {
  const { register, handleSubmit } = useForm();
  const hiddenInputRef = useRef();

  const router = useRouter();
  const locales = router.locales.filter((lng) => lng !== "default");

  const onSubmit = (data) => {
    // i18n.changeLanguage(data.lngSelector);
    router.push(router.pathname, router.pathname, { locale: data.lngSelector });
  };

  const onLngChange = () => {
    hiddenInputRef.current.click();
  };

  // TODO: where should I put "aria-label='Selected language: English'"
  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={onLngChange}>
      <select
        defaultValue={router.locale}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register("lngSelector")}
        type="submit"
      >
        {locales.map((lng) => (
          <option key={lng} value={lng}>
            {lng.toUpperCase()}
          </option>
        ))}
      </select>
      <input ref={hiddenInputRef} type="submit" hidden />
    </form>
  );
}

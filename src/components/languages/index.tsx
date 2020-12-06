import { Select } from "antd"
import React from "react"

export const languageOptions = [
  {label: "Gulf Arabic (ar-AE)", key: "ar-AE", value: "ar-AE"},
  {label: "Modern Standard Arabic (ar-SA)", key: "ar-SA", value: "ar-SA"},
  {label: "Swiss German (de-CH)", key: "de-CH", value: "de-CH"},
  {label: "German (de-DE)", key: "de-DE", value: "de-DE"},
  {label: "Scottish English (en-AB)", key: "en-AB", value: "en-AB"},
  {label: "Australian English (en-AU)", key: "en-AU", value: "en-AU"},
  {label: "British English (en-GB)", key: "en-GB", value: "en-GB"},
  {label: "Irish English (en-IE)", key: "en-IE", value: "en-IE"},
  {label: "Indian English (en-IN)", key: "en-IN", value: "en-IN"},
  {label: "US English (en-US)", key: "en-US", value: "en-US"},
  {label: "Welsh English (en-WL)", key: "en-WL", value: "en-WL"},
  {label: "Spanish (es-ES)", key: "es-ES", value: "es-ES"},
  {label: "US Spanish (es-US)", key: "es-US", value: "es-US"},
  {label: "Farsi (fa-IR)", key: "fa-IR", value: "fa-IR"},
  {label: "Canadian French (fr-CA)", key: "fr-CA", value: "fr-CA"},
  {label: "French (fr-FR)", key: "fr-FR", value: "fr-FR"},
  {label: "Hebrew (he-IL)", key: "he-IL", value: "he-IL"},
  {label: "Indian Hindi (hi-IN)", key: "hi-IN", value: "hi-IN"},
  {label: "Indonesian (id-ID)", key: "id-ID", value: "id-ID"},
  {label: "Italian (it-IT)", key: "it-IT", value: "it-IT"},
  {label: "Japanese (ja-JP)", key: "ja-JP", value: "ja-JP"},
  {label: "Korean (ko-KR)", key: "ko-KR", value: "ko-KR"},
  {label: "Malay (ms-MY)", key: "ms-MY", value: "ms-MY"},
  {label: "Dutch (nl-NL)", key: "nl-NL", value: "nl-NL"},
  {label: "Brazilian Portuguese (pt-BR)", key: "pt-BR", value: "pt-BR"},
  {label: "Portuguese (pt-PT)", key: "pt-PT", value: "pt-PT"},
  {label: "Russian (ru-RU)", key: "ru-RU", value: "ru-RU"},
  {label: "Tamil (ta-IN)", key: "ta-IN", value: "ta-IN"},
  {label: "Telugu (te-IN)", key: "te-IN", value: "te-IN"},
  {label: "Turkish (tr-TR)", key: "tr-TR", value: "tr-TR"},
  {label: "Chinese Mandarin - Mainland (zh-CN)", key: "zh-CN", value: "zh-CN"},
]

const LanguageSelect: React.FunctionComponent = (props) => {

  return(
    <Select
      showSearch
      options={languageOptions}
      placeholder="Auto Detect"
      style={{width: "100%"}}
      optionFilterProp="label"
    />
  )
}

export default LanguageSelect
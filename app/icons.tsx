interface IconProps {
  size?: number
  className?: string
}

export function IconCoal({ size, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.63988 3.53621H5.57514C5.4972 3.53607 5.42 3.5513 5.34796 3.58101C5.27591 3.61073 5.21042 3.65435 5.15524 3.70939L2.78292 6.08171C2.72788 6.13689 2.68426 6.20237 2.65454 6.27442C2.62483 6.34647 2.6096 6.42367 2.60974 6.50161H5C5 6.50161 5 6.50161 5 6.50161H13.3903C13.3904 6.39878 13.3704 6.29692 13.3311 6.20186C13.2919 6.1068 13.2344 6.02039 13.1618 5.94759L10.0317 2.8175C9.95887 2.74488 9.87247 2.68732 9.7774 2.64812C9.68234 2.60891 9.58048 2.58882 9.47765 2.589H8.91261C8.80978 2.58882 8.70792 2.60891 8.61285 2.64812C8.51779 2.68732 8.43139 2.74488 8.35858 2.8175L7.63988 3.53621Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.78085 7.05065C1.8491 7.01734 1.92405 7.00002 2 7L8 7H14C14.076 7.00002 14.1509 7.01735 14.2192 7.05066C14.2874 7.08396 14.3472 7.13239 14.3939 7.19224C14.4407 7.2521 14.4732 7.32182 14.489 7.39611C14.5047 7.4704 14.5034 7.54731 14.485 7.621L13.3429 12.1896C14.0246 12.5078 14.497 13.1995 14.497 14.0015C14.497 15.1052 13.6023 16 12.4985 16C11.3948 16 10.5 15.1052 10.5 14.0015C10.5 14.001 10.5 14.0005 10.5 14H8L5.5 14C5.5 14.0005 5.5 14.001 5.5 14.0015C5.5 15.1052 4.60523 16 3.50148 16C2.39773 16 1.50297 15.1052 1.50297 14.0015C1.50297 13.1995 1.97539 12.5078 2.65714 12.1896L1.515 7.621C1.49662 7.54731 1.49527 7.4704 1.51105 7.39611C1.52683 7.32182 1.55933 7.2521 1.60608 7.19224C1.65283 7.13238 1.71259 7.08396 1.78085 7.05065ZM3.64196 12.0078C4.32155 12.055 4.90758 12.442 5.23135 13L8 13H10.7687C11.0924 12.442 11.6784 12.055 12.358 12.0078L13.36 8H8L2.64 8L3.64196 12.0078ZM3.50148 15C4.05295 15 4.5 14.5529 4.5 14.0015C4.5 13.45 4.05295 13.003 3.50148 13.003C2.95002 13.003 2.50297 13.45 2.50297 14.0015C2.50297 14.5529 2.95002 15 3.50148 15ZM12.4985 15C13.05 15 13.497 14.5529 13.497 14.0015C13.497 13.45 13.05 13.003 12.4985 13.003C11.9471 13.003 11.5 13.45 11.5 14.0015C11.5 14.5529 11.9471 15 12.4985 15Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.28039 8.5L4.04227 11.5475C4.41561 11.6223 4.73156 11.7936 4.97905 11.9823C5.19288 12.1454 5.36725 12.33 5.49726 12.5L10.5107 12.5C10.6452 12.3307 10.8248 12.145 11.0421 11.9809C11.2853 11.7973 11.5951 11.6264 11.9571 11.55L12.7196 8.5L3.28039 8.5Z"
        fillOpacity="0.25"
      />
    </svg>
  )
}

export function IconOil({ size, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 3C14 3.26522 13.8946 3.51957 13.7071 3.70711C13.5196 3.89464 13.2652 4 13 4H12.5V6.5H13C13.2652 6.5 13.5196 6.60536 13.7071 6.79289C13.8946 6.98043 14 7.23478 14 7.5V8.5C14 8.76522 13.8946 9.01957 13.7071 9.20711C13.5196 9.39464 13.2652 9.5 13 9.5H12.5V12H13C13.2652 12 13.5196 12.1054 13.7071 12.2929C13.8946 12.4804 14 12.7348 14 13V14C14 14.2652 13.8946 14.5196 13.7071 14.7071C13.5196 14.8946 13.2652 15 13 15H3C2.73478 15 2.48043 14.8946 2.29289 14.7071C2.10536 14.5196 2 14.2652 2 14V13C2 12.7348 2.10536 12.4804 2.29289 12.2929C2.48043 12.1054 2.73478 12 3 12H3.5V9.5H3C2.73478 9.5 2.48043 9.39464 2.29289 9.20711C2.10536 9.01957 2 8.76522 2 8.5V7.5C2 7.23478 2.10536 6.98043 2.29289 6.79289C2.48043 6.60536 2.73478 6.5 3 6.5H3.5V4H3C2.73478 4 2.48043 3.89464 2.29289 3.70711C2.10536 3.51957 2 3.26522 2 3V2C2 1.73478 2.10536 1.48043 2.29289 1.29289C2.48043 1.10536 2.73478 1 3 1H13C13.2652 1 13.5196 1.10536 13.7071 1.29289C13.8946 1.48043 14 1.73478 14 2V3ZM13 8.5V7.5L3.5 7.50049L3 7.5V8.5H13ZM4.5 9.5V12H11.5V9.5H4.5ZM3 13V14H13V13H3ZM11.5 4V6.5H4.5V4H11.5ZM3 2V3H13V2H3Z"
      />
    </svg>
  )
}

export function IconGas({ size, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9142 4.08579C12.2893 4.46086 12.5 4.96957 12.5 5.5V7.5V10.5V12.5C12.5 13.0304 12.2893 13.5391 11.9142 13.9142C11.5391 14.2893 11.0304 14.5 10.5 14.5H5.5C4.96957 14.5 4.46086 14.2893 4.08579 13.9142C3.71071 13.5391 3.5 13.0304 3.5 12.5V10.5V7.5V5.5C3.5 4.96957 3.71071 4.46086 4.08579 4.08579C4.46086 3.71071 4.96957 3.5 5.5 3.5H10.5C11.0304 3.5 11.5391 3.71071 11.9142 4.08579ZM4.5 7.5V5.5C4.5 5.23478 4.60536 4.98043 4.79289 4.79289C4.98043 4.60536 5.23478 4.5 5.5 4.5H10.5C10.7652 4.5 11.0196 4.60536 11.2071 4.79289C11.3946 4.98043 11.5 5.23478 11.5 5.5V7.5H9.51806C9.55683 7.5359 9.59926 7.57243 9.64568 7.60957C10.1989 8.05217 10.5 8.78207 10.5 9.5C10.5 9.86814 10.4266 10.2043 10.2915 10.5L11.5 10.5V12.5C11.5 12.7652 11.3946 13.0196 11.2071 13.2071C11.0196 13.3946 10.7652 13.5 10.5 13.5H5.5C5.23478 13.5 4.98043 13.3946 4.79289 13.2071C4.60536 13.0196 4.5 12.7652 4.5 12.5V10.5L5.70851 10.5C5.57335 10.2043 5.5 9.86814 5.5 9.5C5.5 8.99452 5.64153 8.2084 6.17296 7.5H4.5ZM7.33333 8.33333C7.26557 8.10745 7.25903 7.84484 7.30542 7.57868C7.30999 7.55248 7.31507 7.52624 7.32065 7.5H8.86082C8.97171 7.66667 9.125 7.83333 9.33333 8C9.75 8.33333 10 8.90933 10 9.5C10 9.89184 9.899 10.2273 9.723 10.5H6.277C6.101 10.2273 6 9.89184 6 9.5C6 9.12756 6.09247 8.57017 6.41519 8.03448C6.52001 7.86049 6.64912 7.68878 6.80724 7.52644L6.83333 7.5C6.79621 7.72276 6.8914 7.91243 7.00838 8.05429C7.15398 8.23085 7.33333 8.33333 7.33333 8.33333Z"
      />
      <path d="M5.5 14C5.5 14.2652 5.60536 14.5196 5.79289 14.7071C5.98043 14.8946 6.23478 15 6.5 15H9.5C9.76522 15 10.0196 14.8946 10.2071 14.7071C10.3946 14.5196 10.5 14.2652 10.5 14H5.5Z" />
      <path d="M5.5 2.5V3.5H6.5V2.5H9.5V3.5H10.5V2.5C10.5 2.23478 10.3946 1.98043 10.2071 1.79289C10.0196 1.60536 9.76522 1.5 9.5 1.5H6.5C6.23478 1.5 5.98043 1.60536 5.79289 1.79289C5.60536 1.98043 5.5 2.23478 5.5 2.5Z" />
      <path
        d="M8 11.3333C6.89533 11.3333 6 10.6667 6 9.5C6 9 6.16667 8.16667 6.83333 7.5C6.75 8 7.33333 8.33333 7.33333 8.33333C7.08333 7.5 7.66667 6.16667 8.66667 6C8.54733 6.66667 8.5 7.33333 9.33333 8C9.75 8.33333 10 8.90933 10 9.5C10 10.6667 9.10467 11.3333 8 11.3333Z"
        className="fill-indigo-500"
      />
    </svg>
  )
}

export function IconSolar({ size, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className={`${className} motion-safe:group-hover:animate-spin`}
      viewBox="0 0 16 16"
    >
      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
    </svg>
  )
}

export function IconWind({ size, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="motion-safe:group-hover:animate-spin motion-safe:group-hover:[animation-duration:3s] origin-center">
        <path
          d="M8 0C8.26522 0 8.51957 0.105357 8.70711 0.292893C8.89464 0.48043 9 0.734784 9 1V6.268H7V1C7 0.734784 7.10536 0.48043 7.29289 0.292893C7.48043 0.105357 7.73478 0 8 0Z"
          fill="white"
        />
        <path
          d="M7 9.732L2.438 12.366C2.32423 12.4327 2.19839 12.4762 2.06773 12.4941C1.93706 12.512 1.80415 12.5038 1.67665 12.4701C1.54915 12.4364 1.42958 12.3778 1.32482 12.2977C1.22006 12.2176 1.13218 12.1175 1.06624 12.0033C1.00029 11.8891 0.957596 11.763 0.940597 11.6322C0.923599 11.5014 0.932636 11.3686 0.96719 11.2413C1.00174 11.114 1.06113 10.9949 1.14193 10.8906C1.22273 10.7864 1.32335 10.6992 1.438 10.634L6 8L7 9.732Z"
          fill="white"
        />
        <path
          d="M10 8L14.562 10.634C14.6766 10.6992 14.7773 10.7864 14.8581 10.8906C14.9389 10.9949 14.9983 11.114 15.0328 11.2413C15.0674 11.3686 15.0764 11.5014 15.0594 11.6322C15.0424 11.763 14.9997 11.8891 14.9338 12.0033C14.8678 12.1175 14.7799 12.2176 14.6752 12.2977C14.5704 12.3778 14.4508 12.4364 14.3233 12.4701C14.1958 12.5038 14.0629 12.512 13.9323 12.4941C13.8016 12.4762 13.6758 12.4327 13.562 12.366L9 9.732L10 8Z"
          fill="white"
        />
        <circle cx="8" cy="8" r="1.5" stroke="white" fill="none" />
      </g>

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 10.3855V16H8.75V10.3855C8.51324 10.4599 8.2613 10.5 8 10.5C7.7387 10.5 7.48676 10.4599 7.25 10.3855Z"
        fill="white"
      />

      <path
        d="M2.79289 4.79289C2.98043 4.60536 3.23478 4.5 3.5 4.5C3.76522 4.5 4.01957 4.60536 4.20711 4.79289C4.39464 4.98043 4.5 5.23478 4.5 5.5C4.5 5.76522 4.39464 6.01957 4.20711 6.20711C4.01957 6.39464 3.76522 6.5 3.5 6.5H0.5C0.367392 6.5 0.240215 6.55268 0.146447 6.64645C0.0526784 6.74022 0 6.86739 0 7C0 7.13261 0.0526784 7.25979 0.146447 7.35355C0.240215 7.44732 0.367392 7.5 0.5 7.5H3.5C3.89556 7.5 4.28224 7.3827 4.61114 7.16294C4.94004 6.94318 5.19638 6.63082 5.34776 6.26537C5.49913 5.89992 5.53874 5.49778 5.46157 5.10982C5.3844 4.72186 5.19392 4.36549 4.91421 4.08579C4.63451 3.80608 4.27814 3.6156 3.89018 3.53843C3.50222 3.46126 3.10009 3.50087 2.73463 3.65224C2.36918 3.80362 2.05682 4.05996 1.83706 4.38886C1.6173 4.71776 1.5 5.10444 1.5 5.5C1.5 5.63261 1.55268 5.75979 1.64645 5.85355C1.74021 5.94732 1.86739 6 2 6C2.13261 6 2.25979 5.94732 2.35355 5.85355C2.44732 5.75979 2.5 5.63261 2.5 5.5C2.5 5.23478 2.60536 4.98043 2.79289 4.79289Z"
        fill="white"
        fillOpacity={0.5}
      />
      <path
        d="M12.7929 1.79289C12.9804 1.60536 13.2348 1.5 13.5 1.5C13.7652 1.5 14.0196 1.60536 14.2071 1.79289C14.3946 1.98043 14.5 2.23478 14.5 2.5C14.5 2.76522 14.3946 3.01957 14.2071 3.20711C14.0196 3.39464 13.7652 3.5 13.5 3.5H10.5C10.3674 3.5 10.2402 3.55268 10.1464 3.64645C10.0527 3.74022 10 3.86739 10 4C10 4.13261 10.0527 4.25979 10.1464 4.35355C10.2402 4.44732 10.3674 4.5 10.5 4.5H13.5C13.8956 4.5 14.2822 4.3827 14.6111 4.16294C14.94 3.94318 15.1964 3.63082 15.3478 3.26537C15.4991 2.89992 15.5387 2.49778 15.4616 2.10982C15.3844 1.72186 15.1939 1.36549 14.9142 1.08579C14.6345 0.806082 14.2781 0.615601 13.8902 0.53843C13.5022 0.46126 13.1001 0.500867 12.7346 0.652242C12.3692 0.803617 12.0568 1.05996 11.8371 1.38886C11.6173 1.71776 11.5 2.10444 11.5 2.5C11.5 2.63261 11.5527 2.75979 11.6464 2.85355C11.7402 2.94732 11.8674 3 12 3C12.1326 3 12.2598 2.94732 12.3536 2.85355C12.4473 2.75979 12.5 2.63261 12.5 2.5C12.5 2.23478 12.6054 1.98043 12.7929 1.79289Z"
        fill="white"
        fillOpacity={0.5}
      />
    </svg>
  )
}

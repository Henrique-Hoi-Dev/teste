export function Logo(props: React.SVGProps<SVGSVGElement>) {
  const stroke = props.stroke || "#1B3E70";
  const color = props.color || "#F58220";
  return (
    <svg
      width="182"
      height="64"
      viewBox="0 0 182 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.6233 56.7705L9.45117 48.5198H10.5842L11.8212 53.93C11.9556 54.4964 12.0745 55.0592 12.1765 55.6162C12.3934 54.7367 12.5202 54.2295 12.5568 54.0951L14.1161 48.5198H15.4318L16.6149 52.6969C16.9049 53.7342 17.12 54.7079 17.2583 55.6162C17.3678 55.0958 17.5079 54.4985 17.6789 53.8242L18.9676 48.5198H20.0643L17.8058 56.7705H16.7436L15.013 50.4843C14.8672 49.9582 14.779 49.6356 14.7463 49.5163C14.6521 49.893 14.5676 50.2155 14.4946 50.4825L12.7641 56.7705H11.6233Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.5028 53.2099H24.8332C24.789 52.7068 24.6604 52.3304 24.451 52.0787C24.1303 51.6888 23.7115 51.4929 23.1986 51.4929C22.7339 51.4929 22.344 51.6485 22.0272 51.9596C21.7122 52.2707 21.5374 52.6876 21.5028 53.2099ZM24.8217 54.8348L25.8702 54.9731C25.707 55.5818 25.4016 56.0563 24.9561 56.3923C24.5104 56.7285 23.9419 56.8975 23.2487 56.8975C22.3767 56.8975 21.6852 56.6287 21.1744 56.0908C20.6635 55.5551 20.4082 54.8001 20.4082 53.8303C20.4082 52.8277 20.6653 52.0479 21.1822 51.4949C21.6987 50.9397 22.3691 50.6632 23.1929 50.6632C23.9899 50.6632 24.6412 50.934 25.1463 51.4776C25.6514 52.0211 25.9049 52.7855 25.9049 53.7708C25.9049 53.8303 25.9029 53.9205 25.899 54.0396H21.4452C21.4836 54.6945 21.6681 55.1978 22.0023 55.5455C22.3344 55.8931 22.7513 56.0677 23.2487 56.0677C23.6194 56.0677 23.9362 55.9699 24.1975 55.7738C24.4606 55.5779 24.6679 55.265 24.8217 54.8348Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M30.9764 53.7745C30.6077 53.9242 30.0545 54.0511 29.3169 54.1548C28.8982 54.2143 28.6024 54.2815 28.4296 54.3564C28.2568 54.4314 28.1242 54.5409 28.0301 54.6831C27.9361 54.8271 27.8881 54.9864 27.8881 55.1631C27.8881 55.43 27.9898 55.6547 28.1953 55.8335C28.4008 56.012 28.7005 56.1023 29.0941 56.1023C29.484 56.1023 29.8317 56.0177 30.1371 55.8467C30.4406 55.6778 30.6653 55.4453 30.8072 55.1516C30.9169 54.9231 30.9707 54.5868 30.9707 54.1432L30.9764 53.7745ZM31.0571 56.0216C30.6806 56.3423 30.3176 56.5669 29.97 56.6995C29.6223 56.8321 29.2497 56.8975 28.8502 56.8975C28.1935 56.8975 27.6884 56.7379 27.335 56.4172C26.9816 56.0984 26.8047 55.6895 26.8047 55.1919C26.8047 54.9 26.8721 54.633 27.0045 54.3909C27.1391 54.1491 27.3137 53.9569 27.5288 53.8111C27.746 53.665 27.988 53.5537 28.2586 53.4787C28.4584 53.4268 28.7599 53.377 29.1615 53.3269C29.9796 53.2309 30.5846 53.1137 30.9707 52.9793C30.9745 52.841 30.9764 52.7528 30.9764 52.7162C30.9764 52.3052 30.8804 52.0152 30.6884 51.8463C30.4289 51.6177 30.0429 51.5043 29.532 51.5043C29.0538 51.5043 28.7005 51.5889 28.4737 51.756C28.2454 51.9231 28.0783 52.2188 27.9688 52.6451L26.9777 52.5068C27.068 52.0824 27.2159 51.7386 27.4232 51.4773C27.6308 51.2163 27.9304 51.0165 28.3222 50.8744C28.7119 50.7343 29.1672 50.6632 29.682 50.6632C30.1928 50.6632 30.6095 50.7226 30.9302 50.8437C31.2491 50.9647 31.4854 51.1144 31.6351 51.297C31.7851 51.4794 31.8907 51.7098 31.9522 51.9884C31.9846 52.1612 32.002 52.4723 32.002 52.9199V54.2643C32.002 55.2033 32.0232 55.7969 32.0653 56.0485C32.1058 56.3 32.1903 56.5402 32.3131 56.7706H31.2529C31.1512 56.5573 31.0859 56.3077 31.0571 56.0216Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M33.5391 56.7705V48.5198H34.5532V56.7705H33.5391Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M38.3201 55.8664L38.4584 56.7615C38.1741 56.8209 37.9188 56.8516 37.6959 56.8516C37.329 56.8516 37.0449 56.794 36.8413 56.6769C36.6397 56.5597 36.4975 56.4081 36.415 56.218C36.3322 56.0278 36.292 55.6282 36.292 55.0193V51.5738H35.543V50.7903H36.292V49.3114L37.306 48.7025V50.7903H38.3201V51.5738H37.306V55.0772C37.306 55.367 37.3233 55.5533 37.3599 55.636C37.3944 55.7185 37.452 55.7839 37.5327 55.8337C37.6134 55.8817 37.7286 55.9069 37.8783 55.9069C37.9898 55.9069 38.1377 55.8934 38.3201 55.8664Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M39.3223 56.7705V48.5198H40.3364V51.4889C40.8068 50.9376 41.4005 50.6631 42.1186 50.6631C42.5586 50.6631 42.9408 50.7495 43.2672 50.9243C43.5918 51.099 43.8242 51.339 43.9644 51.6464C44.1047 51.9536 44.1737 52.4011 44.1737 52.9849V56.7705H43.1596L43.1598 52.9888C43.1598 52.4836 43.0503 52.115 42.8332 51.8846C42.6142 51.6542 42.307 51.5387 41.9074 51.5387C41.6098 51.5387 41.3294 51.6158 41.0663 51.7712C40.803 51.9268 40.6169 52.138 40.5035 52.405C40.3922 52.6699 40.3364 53.0368 40.3364 53.5056V56.7705H39.3223Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M49.0371 56.7705V48.5198H50.6735L52.6248 54.3602C52.8054 54.9038 52.9359 55.3109 53.0186 55.5817C53.1126 55.2821 53.2605 54.8402 53.4602 54.2585L55.4463 48.5198H56.9078V56.7705H55.8591V49.8679L53.4506 56.7705H52.4673L50.0858 49.7412V56.7705H49.0371Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M62.3592 53.7745C61.9905 53.9242 61.4374 54.0511 60.6997 54.1548C60.281 54.2143 59.9852 54.2815 59.8124 54.3564C59.6396 54.4314 59.5071 54.5409 59.4129 54.6831C59.3189 54.8271 59.2709 54.9864 59.2709 55.1631C59.2709 55.43 59.3727 55.6547 59.5781 55.8335C59.7836 56.012 60.0833 56.1023 60.4769 56.1023C60.8668 56.1023 61.2145 56.0177 61.5199 55.8467C61.8234 55.6778 62.0481 55.4453 62.19 55.1516C62.2998 54.9231 62.3535 54.5868 62.3535 54.1432L62.3592 53.7745ZM62.4399 56.0216C62.0634 56.3423 61.7004 56.5669 61.3528 56.6995C61.0051 56.8321 60.6325 56.8975 60.233 56.8975C59.5763 56.8975 59.0712 56.7379 58.7178 56.4172C58.3644 56.0984 58.1875 55.6895 58.1875 55.1919C58.1875 54.9 58.2549 54.633 58.3873 54.3909C58.5219 54.1491 58.6965 53.9569 58.9116 53.8111C59.1288 53.665 59.3708 53.5537 59.6415 53.4787C59.8412 53.4268 60.1427 53.377 60.5443 53.3269C61.3624 53.2309 61.9674 53.1137 62.3535 52.9793C62.3574 52.841 62.3592 52.7528 62.3592 52.7162C62.3592 52.3052 62.2632 52.0152 62.0712 51.8463C61.8118 51.6177 61.4257 51.5043 60.9148 51.5043C60.4367 51.5043 60.0833 51.5889 59.8565 51.756C59.6282 51.9231 59.4611 52.2188 59.3516 52.6451L58.3605 52.5068C58.4508 52.0824 58.5987 51.7386 58.806 51.4773C59.0136 51.2163 59.3132 51.0165 59.705 50.8744C60.0947 50.7343 60.55 50.6632 61.0648 50.6632C61.5756 50.6632 61.9923 50.7226 62.313 50.8437C62.6319 50.9647 62.8682 51.1144 63.0179 51.297C63.1679 51.4794 63.2735 51.7098 63.335 51.9884C63.3674 52.1612 63.3848 52.4723 63.3848 52.9199V54.2643C63.3848 55.2033 63.4061 55.7969 63.4481 56.0485C63.4886 56.3 63.5731 56.5402 63.6959 56.7706H62.6358C62.534 56.5573 62.4687 56.3077 62.4399 56.0216Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M64.9414 56.7705V50.7897H65.8518V51.6386C66.2898 50.9876 66.9236 50.6631 67.7513 50.6631C68.1124 50.6631 68.4427 50.7282 68.7442 50.8569C69.0457 50.9856 69.2724 51.1566 69.4221 51.3659C69.5721 51.5753 69.6777 51.8249 69.7373 52.1131C69.7737 52.3012 69.7929 52.6297 69.7929 53.0983V56.7705H68.7787V53.1367C68.7787 52.7239 68.7403 52.4146 68.6617 52.211C68.583 52.0075 68.4427 51.8441 68.2429 51.7214C68.0431 51.6002 67.807 51.5387 67.538 51.5387C67.1078 51.5387 66.7371 51.6752 66.4242 51.9499C66.111 52.2226 65.9556 52.7431 65.9556 53.5074V56.7705H64.9414Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M75.1756 53.7745C74.8069 53.9242 74.2538 54.0511 73.5162 54.1548C73.0974 54.2143 72.8016 54.2815 72.6288 54.3564C72.456 54.4314 72.3235 54.5409 72.2293 54.6831C72.1353 54.8271 72.0871 54.9864 72.0871 55.1631C72.0871 55.43 72.1891 55.6547 72.3945 55.8335C72.6 56.012 72.8997 56.1023 73.2933 56.1023C73.6832 56.1023 74.0309 56.0177 74.3363 55.8467C74.6396 55.6778 74.8645 55.4453 75.0065 55.1516C75.1159 54.9231 75.1699 54.5868 75.1699 54.1432L75.1756 53.7745ZM75.2563 56.0216C74.8798 56.3423 74.5168 56.5669 74.1692 56.6995C73.8215 56.8321 73.449 56.8975 73.0494 56.8975C72.3927 56.8975 71.8876 56.7379 71.5342 56.4172C71.1808 56.0984 71.0039 55.6895 71.0039 55.1919C71.0039 54.9 71.0713 54.633 71.2037 54.3909C71.3381 54.1491 71.5129 53.9569 71.728 53.8111C71.9452 53.665 72.1872 53.5537 72.4579 53.4787C72.6576 53.4268 72.9591 53.377 73.3607 53.3269C74.1788 53.2309 74.7838 53.1137 75.1699 52.9793C75.1738 52.841 75.1756 52.7528 75.1756 52.7162C75.1756 52.3052 75.0796 52.0152 74.8876 51.8463C74.6282 51.6177 74.2421 51.5043 73.7312 51.5043C73.2531 51.5043 72.8997 51.5889 72.6729 51.756C72.4446 51.9231 72.2773 52.2188 72.168 52.6451L71.1769 52.5068C71.2672 52.0824 71.4151 51.7386 71.6224 51.4773C71.83 51.2163 72.1294 51.0165 72.5214 50.8744C72.9111 50.7343 73.3664 50.6632 73.8812 50.6632C74.392 50.6632 74.8087 50.7226 75.1294 50.8437C75.4483 50.9647 75.6846 51.1144 75.8343 51.297C75.9843 51.4794 76.0897 51.7098 76.1514 51.9884C76.1838 52.1612 76.2012 52.4723 76.2012 52.9199V54.2643C76.2012 55.2033 76.2222 55.7969 76.2645 56.0485C76.305 56.3 76.3895 56.5402 76.5123 56.7706H75.4522C75.3505 56.5573 75.2851 56.3077 75.2563 56.0216Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M78.4023 53.6792C78.4023 54.4609 78.5579 55.0312 78.869 55.3905C79.1819 55.7496 79.5719 55.9301 80.0407 55.9301C80.5072 55.9301 80.8971 55.7514 81.2142 55.3944C81.5289 55.0371 81.6864 54.4762 81.6864 53.7119C81.6864 52.982 81.5232 52.4307 81.1986 52.0602C80.8741 51.6895 80.4823 51.505 80.0251 51.505C79.5737 51.505 79.1918 51.6876 78.8747 52.0524C78.5598 52.4175 78.4023 52.9589 78.4023 53.6792ZM77.5726 57.2668L78.5522 57.4051C78.5924 57.7087 78.7076 57.9295 78.896 58.0696C79.1474 58.2559 79.4912 58.35 79.9273 58.35C80.3959 58.35 80.7589 58.2559 81.0144 58.0696C81.2697 57.8833 81.4425 57.6202 81.5328 57.2842C81.5847 57.0787 81.6096 56.6465 81.6057 55.9877C81.1623 56.5103 80.611 56.7713 79.9504 56.7713C79.1282 56.7713 78.4907 56.4755 78.0411 55.8821C77.5899 55.2906 77.3652 54.58 77.3652 53.7521C77.3652 53.1818 77.469 52.6554 77.6745 52.1733C77.88 51.6913 78.1794 51.3208 78.5714 51.0577C78.9632 50.7944 79.424 50.6639 79.9541 50.6639C80.659 50.6639 81.2409 50.9519 81.6981 51.5281V50.7907H82.6316V55.9551C82.6316 56.8865 82.5374 57.5452 82.3472 57.9333C82.1589 58.3212 81.8574 58.6284 81.4482 58.8533C81.0373 59.078 80.5323 59.1914 79.933 59.1914C79.2203 59.1914 78.6462 59.0319 78.2082 58.7112C77.7684 58.3923 77.5572 57.9103 77.5726 57.2668Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M84.9306 53.2099H88.2609C88.2168 52.7068 88.0881 52.3304 87.8787 52.0787C87.558 51.6888 87.1393 51.4929 86.6264 51.4929C86.1617 51.4929 85.7717 51.6485 85.4549 51.9596C85.1399 52.2707 84.9651 52.6876 84.9306 53.2099ZM88.2495 54.8348L89.2979 54.9731C89.1347 55.5818 88.8293 56.0563 88.3839 56.3923C87.9381 56.7285 87.3697 56.8975 86.6764 56.8975C85.8044 56.8975 85.113 56.6287 84.6021 56.0908C84.0913 55.5551 83.8359 54.8001 83.8359 53.8303C83.8359 52.8277 84.0931 52.0479 84.6099 51.4949C85.1265 50.9397 85.7969 50.6632 86.6206 50.6632C87.4177 50.6632 88.0689 50.934 88.574 51.4776C89.0792 52.0211 89.3327 52.7855 89.3327 53.7708C89.3327 53.8303 89.3306 53.9205 89.3267 54.0396H84.873C84.9114 54.6945 85.0958 55.1978 85.43 55.5455C85.7621 55.8931 86.179 56.0677 86.6764 56.0677C87.0472 56.0677 87.364 55.9699 87.6252 55.7738C87.8883 55.5779 88.0956 55.265 88.2495 54.8348Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M90.5781 56.7705V50.7897H91.4885V51.6347C91.6748 51.3428 91.9244 51.1067 92.2357 50.93C92.5468 50.7513 92.9002 50.6631 93.2977 50.6631C93.7395 50.6631 94.1025 50.7552 94.3848 50.9376C94.6671 51.122 94.8668 51.3776 94.982 51.7079C95.4584 51.0107 96.0749 50.6631 96.8355 50.6631C97.431 50.6631 97.89 50.8263 98.2086 51.1547C98.5295 51.4832 98.6909 51.9883 98.6909 52.6699V56.7705H97.6767V53.0062C97.6767 52.6027 97.6422 52.3108 97.5768 52.1323C97.5114 51.9536 97.3926 51.8114 97.2177 51.7019C97.0449 51.5927 96.8413 51.5387 96.6088 51.5387C96.1864 51.5387 95.8367 51.6791 95.5583 51.9575C95.2799 52.2379 95.1416 52.6855 95.1416 53.2999V56.7705H94.1274V52.8889C94.1274 52.4395 94.0449 52.1015 93.8796 51.8768C93.7144 51.6521 93.4437 51.5387 93.0691 51.5387C92.785 51.5387 92.5217 51.6137 92.2799 51.7634C92.0378 51.9134 91.8629 52.1323 91.7534 52.4224C91.646 52.7104 91.5923 53.1271 91.5923 53.6706V56.7705H90.5781Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M100.938 53.2099H104.269C104.225 52.7068 104.096 52.3304 103.887 52.0787C103.566 51.6888 103.147 51.4929 102.634 51.4929C102.169 51.4929 101.78 51.6485 101.463 51.9596C101.148 52.2707 100.973 52.6876 100.938 53.2099ZM104.257 54.8348L105.306 54.9731C105.143 55.5818 104.837 56.0563 104.392 56.3923C103.946 56.7285 103.377 56.8975 102.684 56.8975C101.812 56.8975 101.121 56.6287 100.61 56.0908C100.099 55.5551 99.8438 54.8001 99.8438 53.8303C99.8438 52.8277 100.101 52.0479 100.618 51.4949C101.134 50.9397 101.805 50.6632 102.628 50.6632C103.425 50.6632 104.077 50.934 104.582 51.4776C105.087 52.0211 105.34 52.7855 105.34 53.7708C105.34 53.8303 105.338 53.9205 105.335 54.0396H100.881C100.919 54.6945 101.104 55.1978 101.438 55.5455C101.77 55.8931 102.187 56.0677 102.684 56.0677C103.055 56.0677 103.372 55.9699 103.633 55.7738C103.896 55.5779 104.103 55.265 104.257 54.8348Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M106.586 56.7705V50.7897H107.496V51.6386C107.934 50.9876 108.568 50.6631 109.396 50.6631C109.757 50.6631 110.087 50.7282 110.389 50.8569C110.69 50.9856 110.917 51.1566 111.067 51.3659C111.217 51.5753 111.322 51.8249 111.382 52.1131C111.418 52.3012 111.437 52.6297 111.437 53.0983V56.7705H110.423V53.1367C110.423 52.7239 110.385 52.4146 110.306 52.211C110.228 52.0075 110.087 51.8441 109.887 51.7214C109.688 51.6002 109.452 51.5387 109.183 51.5387C108.752 51.5387 108.382 51.6752 108.069 51.9499C107.756 52.2226 107.6 52.7431 107.6 53.5074V56.7705H106.586Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M115.197 55.8664L115.335 56.7615C115.051 56.8209 114.796 56.8516 114.573 56.8516C114.206 56.8516 113.922 56.794 113.718 56.6769C113.517 56.5597 113.374 56.4081 113.292 56.218C113.209 56.0278 113.169 55.6282 113.169 55.0193V51.5738H112.42V50.7903H113.169V49.3114L114.183 48.7025V50.7903H115.197V51.5738H114.183V55.0772C114.183 55.367 114.2 55.5533 114.237 55.636C114.271 55.7185 114.329 55.7839 114.41 55.8337C114.49 55.8817 114.606 55.9069 114.755 55.9069C114.867 55.9069 115.015 55.8934 115.197 55.8664Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M125.403 53.8765L126.498 54.1531C126.269 55.05 125.858 55.7318 125.265 56.2024C124.671 56.6728 123.945 56.9092 123.087 56.9092C122.2 56.9092 121.477 56.7286 120.92 56.3656C120.363 56.0045 119.941 55.4802 119.651 54.7947C119.361 54.1069 119.215 53.3714 119.215 52.5839C119.215 51.7254 119.378 50.9764 119.707 50.3368C120.035 49.6973 120.502 49.2114 121.107 48.8792C121.712 48.5469 122.378 48.3816 123.104 48.3816C123.93 48.3816 124.623 48.591 125.184 49.0116C125.747 49.4322 126.139 50.0219 126.36 50.7826L125.288 51.036C125.098 50.4367 124.819 49.9988 124.456 49.7261C124.093 49.4514 123.636 49.3151 123.085 49.3151C122.453 49.3151 121.923 49.4669 121.499 49.7702C121.074 50.0738 120.774 50.4829 120.603 50.9938C120.431 51.5064 120.344 52.0347 120.344 52.5782C120.344 53.2792 120.446 53.8918 120.649 54.4143C120.853 54.9387 121.17 55.3284 121.6 55.5878C122.03 55.847 122.495 55.9757 122.996 55.9757C123.607 55.9757 124.122 55.799 124.544 55.4475C124.967 55.0941 125.253 54.5718 125.403 53.8765Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M133.723 53.8765L134.818 54.1531C134.59 55.05 134.178 55.7318 133.585 56.2024C132.992 56.6728 132.265 56.9092 131.407 56.9092C130.52 56.9092 129.798 56.7286 129.241 56.3656C128.684 56.0045 128.261 55.4802 127.971 54.7947C127.681 54.1069 127.535 53.3714 127.535 52.5839C127.535 51.7254 127.698 50.9764 128.027 50.3368C128.355 49.6973 128.822 49.2114 129.427 48.8792C130.032 48.5469 130.698 48.3816 131.424 48.3816C132.25 48.3816 132.944 48.591 133.504 49.0116C134.067 49.4322 134.459 50.0219 134.68 50.7826L133.608 51.036C133.418 50.4367 133.14 49.9988 132.777 49.7261C132.413 49.4514 131.956 49.3151 131.405 49.3151C130.773 49.3151 130.243 49.4669 129.819 49.7702C129.394 50.0738 129.095 50.4829 128.924 50.9938C128.751 51.5064 128.665 52.0347 128.665 52.5782C128.665 53.2792 128.766 53.8918 128.97 54.4143C129.173 54.9387 129.49 55.3284 129.921 55.5878C130.351 55.847 130.816 55.9757 131.317 55.9757C131.928 55.9757 132.442 55.799 132.865 55.4475C133.287 55.0941 133.574 54.5718 133.723 53.8765Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M138.268 56.7705V49.4875H135.549V48.5198H142.083V49.4875H139.363V56.7705H138.268Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M145.559 56.7705L142.371 48.5198H143.554L145.698 54.5159C145.868 54.9959 146.014 55.4453 146.13 55.8658C146.256 55.4146 146.404 54.9653 146.573 54.5159L148.797 48.5198H149.911L146.694 56.7705H145.559Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M150.871 56.7705V48.5198H152.507L154.459 54.3602C154.639 54.9038 154.77 55.3109 154.853 55.5817C154.947 55.2821 155.094 54.8402 155.294 54.2585L157.28 48.5198H158.742V56.7705H157.693V49.8679L155.285 56.7705H154.301L151.92 49.7412V56.7705H150.871Z"
        fill={stroke}
      />
      <path
        d="M176.654 4.32723C173.921 15.6118 164.14 21.764 158.39 25.0488L158.141 24.7151C160.497 22.7951 168.591 16.8241 171.18 6.9222L176.654 4.32723Z"
        fill={color}
      />
      <path
        d="M34.5196 26.0073C34.3696 27.0347 32.2834 41.6091 32.0859 42.9678H36.7596C36.9081 41.9367 38.9969 27.3634 39.1932 26.0073H34.5196Z"
        fill={stroke}
      />
      <path
        d="M72.7645 26.0073C72.6157 27.0347 70.5284 41.6091 70.332 42.9678H81.2855C81.3954 42.2229 81.6715 40.2567 81.8091 39.3081H75.1732L75.6244 36.1719H81.6441C81.7493 35.4469 82.0005 33.6807 82.1342 32.7545H76.1131L76.5543 29.6622H83.0167C83.1241 28.9173 83.4103 26.9522 83.5392 26.0073H72.7645Z"
        fill={stroke}
      />
      <path
        d="M20.7156 35.7224C20.7156 35.7224 24.6267 26.7852 24.9292 26.0079H30.814C30.8177 27.1964 30.0341 41.7672 30.0378 42.9658H25.8066L26.509 31.0927C26.509 31.0927 21.7419 42.2134 21.4256 42.9658H18.0832L16.5821 31.0927C16.4683 31.6275 14.8845 39.5647 14.0209 42.9658H9.80469C10.2435 41.4508 13.466 26.8792 13.7233 26.0079H19.3856L20.7156 35.7224Z"
        fill={stroke}
      />
      <path
        d="M60.549 36.0352L63.2276 29.7392L64.0976 36.0352H60.549ZM64.5488 39.5351C64.5488 39.5351 64.8489 42.3013 64.9575 42.9648H69.4361C69.1874 41.5687 66.7399 26.9957 66.5614 26.0083H60.8914C60.564 26.7118 54.0929 41.3002 53.3242 42.9648H57.879C58.1204 42.3987 59.2703 39.5413 59.2703 39.5413L64.5488 39.5351Z"
        fill={stroke}
      />
      <path
        d="M45.7094 29.192H46.7519C47.4643 29.192 48.2579 29.2658 48.753 29.8345C49.1041 30.2395 49.2317 30.8094 49.1229 31.5394C49.1229 31.5394 48.9841 32.832 48.1304 33.2407C48.1304 33.2407 47.543 33.6242 46.5693 33.6505H44.4593L48.4431 42.9678H52.9791L49.5492 35.8206C51.6267 35.4357 53.2491 34.8181 53.6603 31.5968C53.7154 31.1931 53.7478 30.8094 53.7478 30.4446C53.7478 29.2507 53.4365 28.2921 52.8141 27.5746C51.6891 26.2759 49.7592 26.0085 48.3279 26.0085H41.9208C41.7733 27.0334 39.6821 41.6078 39.4883 42.9678H43.7395C43.8869 42.0215 45.7094 29.192 45.7094 29.192Z"
        fill={stroke}
      />
      <path
        d="M137.444 32.7549C137.533 32.7362 137.609 32.7164 137.697 32.6978C137.609 32.7164 137.523 32.7362 137.438 32.7549H137.444Z"
        fill={stroke}
      />
      <path
        d="M139.326 32.3113C138.974 32.3925 138.612 32.485 138.246 32.5664C138.612 32.485 138.974 32.3925 139.326 32.3113Z"
        fill={stroke}
      />
      <path
        d="M128.34 34.4365C128.36 34.4365 128.395 34.4329 128.419 34.4278C128.395 34.4329 128.36 34.4365 128.34 34.4365Z"
        fill={stroke}
      />
      <path
        d="M140.434 32.0292C140.224 32.0817 140.012 32.1391 139.797 32.1992C140.012 32.1391 140.224 32.0817 140.434 32.0292Z"
        fill={stroke}
      />
      <path
        d="M131.319 33.9662C131.279 33.9762 131.238 33.9848 131.195 33.9873C131.238 33.9848 131.279 33.9762 131.319 33.9662Z"
        fill={stroke}
      />
      <path
        d="M129.971 34.1928C129.878 34.2039 129.797 34.2151 129.709 34.2314C129.797 34.2151 129.878 34.2039 129.971 34.1928Z"
        fill={stroke}
      />
      <path
        d="M146.639 30.2234C146.162 30.3873 145.665 30.5359 145.156 30.6934C145.665 30.5359 146.162 30.3873 146.639 30.2234Z"
        fill={stroke}
      />
      <path
        d="M144.913 30.7749C144.702 30.8325 144.489 30.8999 144.27 30.9648C144.489 30.8999 144.702 30.8325 144.913 30.7749Z"
        fill={stroke}
      />
      <path
        d="M144.012 31.0391C143.316 31.2441 142.597 31.4553 141.85 31.6592C142.597 31.4553 143.316 31.2441 144.012 31.0391Z"
        fill={stroke}
      />
      <path
        d="M141.494 31.7528C141.28 31.8054 141.067 31.8641 140.852 31.9229C141.067 31.8641 141.28 31.8054 141.494 31.7528Z"
        fill={stroke}
      />
      <path
        d="M118.454 35.4841C118.428 35.488 118.393 35.4941 118.367 35.4941C118.393 35.4941 118.428 35.488 118.454 35.4841Z"
        fill={stroke}
      />
      <path
        d="M107.276 35.7969C107.183 35.7969 107.09 35.7969 106.992 35.7932C107.09 35.7969 107.183 35.7969 107.276 35.7969Z"
        fill={stroke}
      />
      <path
        d="M119.789 35.3933C119.756 35.3933 119.716 35.3933 119.674 35.4033C119.716 35.3933 119.756 35.3933 119.789 35.3933Z"
        fill={stroke}
      />
      <path
        d="M117.105 35.5703C117.077 35.5742 117.06 35.5742 117.041 35.5742C117.06 35.5742 117.077 35.5742 117.105 35.5703Z"
        fill={stroke}
      />
      <path
        d="M144.905 26.008C144.798 26.7129 144.468 28.9504 144.307 30.043C147.609 29.1216 151.592 27.7993 155.285 26.008H144.905Z"
        fill={stroke}
      />
      <path
        d="M114.162 33.5312C113.752 33.2176 113.274 32.9239 112.72 32.6764C112.701 32.665 111.485 32.0627 111.485 32.0627L111.475 32.0551L111.452 32.0451C111.055 31.8163 110.126 31.275 110.126 30.3676C110.126 29.9239 110.301 29.544 110.615 29.2764C110.999 28.9589 111.595 28.8414 112.23 28.9527C113.032 29.0789 113.953 29.6003 114.965 30.4677C115.444 29.544 116.361 27.774 116.696 27.1404C115.535 26.1866 114.409 25.6755 112.731 25.3804C110.657 25.0691 108.659 25.5116 107.254 26.5754C106.073 27.4816 105.337 28.8064 105.138 30.409C105.106 30.6864 105.098 30.9452 105.098 31.2C105.098 31.955 105.23 32.6126 105.493 33.1875C105.594 33.1964 105.691 33.2037 105.793 33.2176C107.909 33.3726 110.819 33.5038 114.162 33.5312Z"
        fill={stroke}
      />
      <path
        d="M136.256 29.6639H142.715C142.823 28.914 143.104 26.9528 143.24 26.0079H132.462C132.402 26.4454 131.986 29.3302 131.516 32.6113C133.004 32.4239 134.484 32.2077 135.922 31.9487L136.256 29.6639Z"
        fill={stroke}
      />
      <path
        d="M146.638 30.224C146.161 30.3879 145.664 30.5364 145.156 30.6939C145.078 30.7227 145.001 30.7465 144.913 30.7753C144.703 30.8365 144.492 30.9003 144.273 30.9677C144.183 30.9876 144.096 31.0189 144.012 31.0402C143.309 31.2466 142.599 31.4539 141.851 31.6578C141.728 31.6877 141.613 31.7216 141.493 31.7552C141.282 31.8077 141.066 31.8651 140.846 31.9202C140.71 31.9552 140.577 31.9965 140.433 32.029C140.225 32.0839 140.012 32.1389 139.797 32.1977C139.642 32.2301 139.481 32.269 139.326 32.3115C138.973 32.3952 138.616 32.4839 138.247 32.5675C138.066 32.6114 137.883 32.6528 137.695 32.6964C137.606 32.7152 137.528 32.7364 137.442 32.754H137.436C135.519 33.1865 133.48 33.6002 131.319 33.9675C131.279 33.9751 131.237 33.9815 131.191 33.9851C130.791 34.0576 130.38 34.125 129.97 34.1927C129.879 34.2039 129.798 34.2114 129.707 34.2276C129.284 34.3012 128.854 34.365 128.421 34.4288C128.391 34.4324 128.365 34.4377 128.341 34.4377C126.018 34.7776 123.573 35.0688 121.009 35.2887H120.97C120.58 35.3264 120.188 35.3588 119.789 35.3924C119.755 35.3924 119.714 35.3988 119.673 35.4025C119.269 35.4313 118.861 35.4612 118.453 35.4839C118.429 35.4875 118.394 35.4937 118.369 35.4937C117.945 35.52 117.527 35.5488 117.103 35.5725C117.079 35.5776 117.057 35.5776 117.04 35.5776C116.609 35.5988 116.177 35.6237 115.735 35.6461H115.704C113.551 35.7513 111.321 35.8087 109.018 35.8087H108.857C108.336 35.8039 107.812 35.8 107.275 35.8C107.187 35.8 107.088 35.8 106.993 35.7938C105.128 35.765 103.225 35.7001 101.268 35.5949H101.237C98.2874 35.4425 95.2448 35.1949 92.1051 34.8363L95.7237 31.4365C95.7237 31.4365 97.8236 32.069 100.734 32.589C100.176 29.3104 99.6924 26.4292 99.6161 26.008H93.9424C93.6188 26.7115 87.1414 41.301 86.3828 42.9671H90.9326C91.1714 42.3986 92.7013 38.7536 92.7013 38.7536L97.4474 38.7499C97.4474 38.7499 97.9061 42.2973 98.0099 42.9671H102.489C102.395 42.4196 101.964 39.861 101.457 36.89C104.657 37.0699 107.855 37.0987 110.841 37.0612C110.996 37.3113 111.073 37.5812 111.073 37.8724C111.073 37.9787 111.067 38.08 111.046 38.1874C110.977 38.5675 110.781 38.8786 110.478 39.0948C109.854 39.5312 108.972 39.4361 108.356 39.3273C106.911 39.0772 105.762 37.9812 104.833 37.0699C104.248 38.0187 103.028 40.0084 102.64 40.6523C104.347 42.2084 106.191 43.1609 108.147 43.4322C110.123 43.7298 112.083 43.2834 113.535 42.2121C114.805 41.2722 115.6 39.9074 115.844 38.2612C115.924 37.7849 115.957 37.3387 115.934 36.9113C119.138 36.7762 121.794 36.5762 123.501 36.4313C124.055 36.8375 124.344 37.3175 124.344 37.8724C124.344 37.9787 124.334 38.08 124.32 38.1874C124.25 38.5675 124.049 38.8786 123.739 39.0948C123.124 39.5312 122.239 39.4361 121.632 39.3273C120.181 39.0772 119.025 37.9812 118.099 37.0699C117.518 38.0187 116.303 40.0084 115.905 40.6523C117.617 42.2084 119.464 43.1609 121.418 43.4322C123.394 43.7298 125.35 43.2834 126.798 42.2121C128.07 41.2722 128.873 39.9074 129.121 38.2612C129.279 37.3424 129.238 36.5175 129.017 35.7762C129.745 35.68 130.437 35.5725 131.099 35.4612C130.592 39.0224 130.116 42.3497 130.029 42.9671L140.987 42.9673C141.091 42.221 141.371 40.2573 141.508 39.3049H134.871L135.321 36.17H141.34C141.437 35.52 141.648 34.0352 141.792 33.0665C142.608 32.8089 143.023 32.6528 143.023 32.6528C143.023 32.6528 145.056 32.0377 147.697 31.0727C147.316 33.7264 146.151 41.8473 145.991 42.9673H150.731C150.875 41.9709 152.569 30.224 152.569 30.224H155.999C156.095 29.4939 156.425 27.1666 156.58 26.1117C154.798 27.1003 151.438 28.6516 146.638 30.224Z"
        fill={stroke}
      />
      <path
        d="M125.99 32.6785C125.964 32.6684 124.756 32.0598 124.756 32.0598L124.739 32.0547L124.724 32.0449C124.321 31.8186 123.389 31.2774 123.389 30.3699C123.394 29.9274 123.567 29.5425 123.882 29.2762C124.268 28.9574 124.86 28.8412 125.489 28.9512C126.298 29.0774 127.216 29.6049 128.23 30.4673C128.713 29.5425 129.628 27.7775 129.963 27.1425C128.799 26.185 127.674 25.6787 125.999 25.38C123.923 25.0776 121.925 25.5139 120.524 26.5788C119.339 27.4799 118.603 28.8111 118.408 30.4124C118.377 30.686 118.359 30.9498 118.359 31.2035C118.359 32.0899 118.549 32.8522 118.918 33.4961C121.443 33.4385 124.105 33.3135 126.784 33.0947C126.535 32.9523 126.276 32.8047 125.99 32.6785Z"
        fill={stroke}
      />
    </svg>
  );
}

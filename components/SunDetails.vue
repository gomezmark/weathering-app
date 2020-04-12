<template>
  <div>
    <div class="mb-3">
      <img src="/sunrise.png" alt="sunrise" height="60" />
      <p class="mb-0 bold">Sunrise</p>
      <span>{{ $store.state.locationWeather.sys.sunrise | formatDateTime('hh:mm A') }}</span>
    </div>
    <div>
      <img src="/sunset.png" alt="sunrise" height="60" />
      <p class="mb-0 bold">Sunset</p>
      <span>{{ $store.state.locationWeather.sys.sunset | formatDateTime('hh:mm A') }}</span>
    </div>
  </div>
</template>
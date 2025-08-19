// 1990年代アニメ風イラストの設定
export const animeImages = {
  // メインページ（トップページ）
  main: {
    ryokanNight: '/images/anime-style/main-ryokan-night.webp',
    onsenOutdoor: '/images/anime-style/main-onsen-outdoor.webp',
    kaisekiMeal: '/images/anime-style/main-kaiseki-meal.webp',
  },
  
  // 温泉ページ
  onsen: {
    outdoorView: '/images/anime-style/onsen-outdoor-view.webp',
    relaxation: '/images/anime-style/onsen-relaxation.webp',
    indoorBath: '/images/anime-style/onsen-indoor-bath.webp',
    privateBath: '/images/anime-style/onsen-private-bath.webp',
    valleyView: '/images/anime-style/onsen-valley-view.webp',
    naturalSpring: '/images/anime-style/onsen-natural-spring.webp',
    largePublicBath: '/images/anime-style/Onsen_LargePublicBath.webp',
  },
  
  // お料理ページ
  cuisine: {
    kaisekiCourse: '/images/anime-style/cuisine-kaiseki-course.webp',
    chefCooking: '/images/anime-style/cuisine-chef-cooking.webp',
    seasonalDishes: '/images/anime-style/cuisine-seasonal-dishes.webp',
    privateRoom: '/images/anime-style/cuisine-private-room.webp',
    cherryRoom: '/images/anime-style/cuisine-cherry-room.webp',
    largeHall: '/images/anime-style/cuisine-large-hall.webp',
  },
  
  // お部屋ページ
  rooms: {
    tatamiInterior: '/images/anime-style/rooms-tatami-interior.webp',
    luxuryWithBath: '/images/anime-style/rooms-luxury-with-bath.webp',
    valleyView: '/images/anime-style/rooms-valley-view.webp',
  },
  
  // プランページ
  plans: {
    romanticCouple: '/images/anime-style/plans-romantic-couple.webp',
    gourmetDining: '/images/anime-style/plans-gourmet-dining.webp',
    healingOnsen: '/images/anime-style/plans-healing-onsen.webp',
    familyHappy: '/images/anime-style/plans-family-happy.webp',
    soloTraveler: '/images/anime-style/plans-solo-traveler.webp',
    premiumLuxury: '/images/anime-style/plans-premium-luxury.webp',
  },
  
  // 観光・施設ページ
  sightseeing: {
    landscape: '/images/anime-style/sightseeing-landscape.webp',
    valley: '/images/anime-style/sightseeing-valley.webp',
    shrine: '/images/anime-style/sightseeing-shrine.webp',
    onsenTown: '/images/anime-style/sightseeing-onsen-town.webp',
    mountain: '/images/anime-style/sightseeing-mountain.webp',
    spring: '/images/anime-style/sightseeing-spring.webp',
    summer: '/images/anime-style/sightseeing-summer.webp',
    autumn: '/images/anime-style/sightseeing-autumn.webp',
    winter: '/images/anime-style/sightseeing-winter.webp',
  },
  
  facilities: {
    gardenLobby: '/images/anime-style/facilities-garden-lobby.webp',
    onsenBath: '/images/anime-style/facilities-onsen-bath.webp',
    restaurant: '/images/anime-style/facilities-restaurant.webp',
    lobby: '/images/anime-style/facilities-lobby.webp',
    shop: '/images/anime-style/facilities-shop.webp',
  },
  
  access: {
    mountainRoad: '/images/anime-style/access-mountain-road.webp',
    parking: '/images/anime-style/access-parking.webp',
    map: '/images/anime-style/access-map.webp',
  },
  
  faq: {
    hero: '/images/anime-style/faq-hero.webp',
  },
  
  contact: {
    hero: '/images/anime-style/contact-hero.webp',
  },
  
  privacy: {
    hero: '/images/anime-style/privacy-hero.webp',
  },
  
  terms: {
    hero: '/images/anime-style/terms-hero.webp',
  },

  // Instagram投稿画像
  instagram: {
    onsenSunset: '/images/anime-style/instagram-onsen-sunset.webp',
    kaisekiDish: '/images/anime-style/instagram-kaiseki-dish.webp',
    tatamiMorning: '/images/anime-style/instagram-tatami-morning.webp',
    gardenSeasonal: '/images/anime-style/instagram-garden-seasonal.webp',
  },
};

// プラン別の画像マッピング
export const planImages = {
  'romantic-special': {
    main: animeImages.plans.romanticCouple,
    gallery: [
      animeImages.plans.romanticCouple,
      animeImages.rooms.luxuryWithBath,
      animeImages.cuisine.kaisekiCourse,
    ],
  },
  'gourmet-seasonal': {
    main: animeImages.plans.gourmetDining,
    gallery: [
      animeImages.plans.gourmetDining,
      animeImages.cuisine.seasonalDishes,
      animeImages.cuisine.chefCooking,
    ],
  },
  'relax-onsen': {
    main: animeImages.plans.healingOnsen,
    gallery: [
      animeImages.plans.healingOnsen,
      animeImages.onsen.outdoorView,
      animeImages.onsen.relaxation,
    ],
  },
  'family-friendly': {
    main: animeImages.plans.familyHappy,
    gallery: [
      animeImages.plans.familyHappy,
      animeImages.rooms.tatamiInterior,
      animeImages.facilities.gardenLobby,
    ],
  },
  'solo-healing': {
    main: animeImages.plans.soloTraveler,
    gallery: [
      animeImages.plans.soloTraveler,
      animeImages.rooms.valleyView,
      animeImages.onsen.relaxation,
    ],
  },
  'valley-view': {
    main: animeImages.rooms.valleyView,
    gallery: [
      animeImages.rooms.valleyView,
      animeImages.sightseeing.valley,
      animeImages.cuisine.kaisekiCourse,
    ],
  },
  'premium-suite': {
    main: animeImages.plans.premiumLuxury,
    gallery: [
      animeImages.plans.premiumLuxury,
      animeImages.rooms.luxuryWithBath,
      animeImages.cuisine.kaisekiCourse,
    ],
  },
};

// フォールバック用の画像（AI生成に失敗した場合）
export const fallbackImages = {
  ryokan: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  onsen: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  cuisine: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
}; 
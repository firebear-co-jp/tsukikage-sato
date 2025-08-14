// 1990年代アニメ風イラストの設定
export const animeImages = {
  // メインページ（トップページ）
  main: {
    ryokanNight: '/tsukikage-sato/images/anime-style/main-ryokan-night.png',
    onsenOutdoor: '/tsukikage-sato/images/anime-style/main-onsen-outdoor.png',
    kaisekiMeal: '/tsukikage-sato/images/anime-style/main-kaiseki-meal.png',
  },
  
  // 温泉ページ
  onsen: {
    outdoorView: '/tsukikage-sato/images/anime-style/onsen-outdoor-view.png',
    relaxation: '/tsukikage-sato/images/anime-style/onsen-relaxation.png',
    indoorBath: '/tsukikage-sato/images/anime-style/onsen-indoor-bath.png',
    privateBath: '/tsukikage-sato/images/anime-style/onsen-private-bath.png',
    valleyView: '/tsukikage-sato/images/anime-style/onsen-valley-view.png',
    naturalSpring: '/tsukikage-sato/images/anime-style/onsen-natural-spring.png',
    largePublicBath: '/tsukikage-sato/images/anime-style/Onsen_LargePublicBath.png',
  },
  
  // お料理ページ
  cuisine: {
    kaisekiCourse: '/tsukikage-sato/images/anime-style/cuisine-kaiseki-course.png',
    chefCooking: '/tsukikage-sato/images/anime-style/cuisine-chef-cooking.png',
    seasonalDishes: '/tsukikage-sato/images/anime-style/cuisine-seasonal-dishes.png',
    privateRoom: '/tsukikage-sato/images/anime-style/cuisine-private-room.png',
    cherryRoom: '/tsukikage-sato/images/anime-style/cuisine-cherry-room.png',
    largeHall: '/tsukikage-sato/images/anime-style/cuisine-large-hall.png',
  },
  
  // お部屋ページ
  rooms: {
    tatamiInterior: '/tsukikage-sato/images/anime-style/rooms-tatami-interior.png',
    luxuryWithBath: '/tsukikage-sato/images/anime-style/rooms-luxury-with-bath.png',
    valleyView: '/tsukikage-sato/images/anime-style/rooms-valley-view.png',
  },
  
  // プランページ
  plans: {
    romanticCouple: '/tsukikage-sato/images/anime-style/plans-romantic-couple.png',
    gourmetDining: '/tsukikage-sato/images/anime-style/plans-gourmet-dining.png',
    healingOnsen: '/tsukikage-sato/images/anime-style/plans-healing-onsen.png',
    familyHappy: '/tsukikage-sato/images/anime-style/plans-family-happy.png',
    soloTraveler: '/tsukikage-sato/images/anime-style/plans-solo-traveler.png',
    premiumLuxury: '/tsukikage-sato/images/anime-style/plans-premium-luxury.png',
  },
  
  // 観光・施設ページ
  sightseeing: {
    landscape: '/tsukikage-sato/images/anime-style/sightseeing-landscape.png',
    valley: '/tsukikage-sato/images/anime-style/sightseeing-valley.png',
    shrine: '/tsukikage-sato/images/anime-style/sightseeing-shrine.png',
    onsenTown: '/tsukikage-sato/images/anime-style/sightseeing-onsen-town.png',
    mountain: '/tsukikage-sato/images/anime-style/sightseeing-mountain.png',
    spring: '/tsukikage-sato/images/anime-style/sightseeing-spring.png',
    summer: '/tsukikage-sato/images/anime-style/sightseeing-summer.png',
    autumn: '/tsukikage-sato/images/anime-style/sightseeing-autumn.png',
    winter: '/tsukikage-sato/images/anime-style/sightseeing-winter.png',
  },
  
  facilities: {
    gardenLobby: '/tsukikage-sato/images/anime-style/facilities-garden-lobby.png',
    onsenBath: '/tsukikage-sato/images/anime-style/facilities-onsen-bath.png',
    restaurant: '/tsukikage-sato/images/anime-style/facilities-restaurant.png',
    lobby: '/tsukikage-sato/images/anime-style/facilities-lobby.png',
    shop: '/tsukikage-sato/images/anime-style/facilities-shop.png',
  },
  
  access: {
    mountainRoad: '/tsukikage-sato/images/anime-style/access-mountain-road.png',
    parking: '/tsukikage-sato/images/anime-style/access-parking.png',
    map: '/tsukikage-sato/images/anime-style/access-map.png',
  },
  
  faq: {
    hero: '/tsukikage-sato/images/anime-style/faq-hero.png',
  },
  
  contact: {
    hero: process.env.NODE_ENV === 'production' 
      ? '/tsukikage-sato/images/anime-style/contact-hero.png'
      : '/images/anime-style/contact-hero.png',
  },
  
  privacy: {
    hero: '/tsukikage-sato/images/anime-style/privacy-hero.png',
  },
  
  terms: {
    hero: '/tsukikage-sato/images/anime-style/terms-hero.png',
  },

  // Instagram投稿画像
  instagram: {
    onsenSunset: '/tsukikage-sato/images/anime-style/instagram-onsen-sunset.png',
    kaisekiDish: '/tsukikage-sato/images/anime-style/instagram-kaiseki-dish.png',
    tatamiMorning: '/tsukikage-sato/images/anime-style/instagram-tatami-morning.png',
    gardenSeasonal: '/tsukikage-sato/images/anime-style/instagram-garden-seasonal.png',
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
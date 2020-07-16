<template>
    <div id="app">
        <keep-alive v-if="$route.meta.keepAlive"> 
            <router-view></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
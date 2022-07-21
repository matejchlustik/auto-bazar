<template>
    <nav>
        <div class="left">
            <p>Auto bazar</p>
        </div>
        <div class="links">
            <router-link to="/">Domov</router-link>
            <router-link to="/addOffer" class="red-highlight">Pridať inzerát</router-link>
        </div>
        <div class="right">
            <p>Auto bazar</p>
        </div>
    </nav>
</template>


<style scoped>
nav {
    background-color: #fff;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    top: 0;
    min-height: 50px;
    border-bottom: 4px solid rgb(86, 137, 255);
}

nav p {
    margin: 0px 20px;
    font-size: 20px;
}

a {
    display: inline-block;
    text-decoration: none;
    color: #343433;
    margin: 0px 14px;
    margin: 14px;
    box-sizing: border-box;
}

a:hover {
    border-bottom: 3px solid rgb(86, 137, 255);
    margin-bottom: 11px;

}

a:visited {
    text-decoration: none;
}

.links {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.left,
.right {
    flex: 1;
    display: flex;
    align-items: center;
}

.right {
    visibility: hidden
}

.red-highlight {
    background-color: rgb(255, 86, 86);
    padding: 14px;
    margin: 0 14px;
    color: #fff;
}

.red-highlight:hover {
    background-color: rgba(255, 86, 86, 0.677);
    border: none;
    margin: 0 14px;
}

@media only screen and (max-width: 600px) {
    nav {
        flex-direction: column;
        justify-content: flex-start;
        padding-bottom: 10px;
    }

    .left,
    .right {
        justify-content: center;
        margin: 10px 0px;
    }

    .right {
        display: none
    }

    .center {
        flex-direction: column;
    }
}
</style>
<template>
    <ul class="nav-list">
        <li>
            <router-link :to="type ? `/unsure-factory/${type}`:''">
                <svg>
                    <use xlink:href="#icon-group-client-dustry"/>
                </svg>
                <p>工业</p>
            </router-link>
        </li>
        <li>
            <router-link :to="type ? `/unsure-business/${type}`:''" >
                <svg>
                    <use xlink:href="#icon-group-client-business"/>
                </svg>
                <p>商业</p>
            </router-link>
        </li>
        <li>
            <router-link :to="type ? `/unsure-hospital/${type}`:''" >
                <svg>
                    <use xlink:href="#icon-group-client-hospital"/>
                </svg>
                <p>医院</p>
            </router-link>
        </li>
        <li>
            <router-link :to="type ? `/unsure-chain/${type}`:''" >
                <svg>
                    <use xlink:href="#icon-group-client-chain"/>
                </svg>
                <p>连锁</p>
            </router-link>
        </li>
        <li>
            <router-link :to="type ? `/unsure-monomer/${type}`:''" >
                <svg>
                    <use xlink:href="#icon-group-client-drugshops"/>
                </svg>
                <p>单体</p>
            </router-link>
        </li>
        <li>
            <router-link :to="type ? `/unsure-clinic/${type}`:''" >
                <svg>
                    <use xlink:href="#icon-group-client-clinic"/>
                </svg>
                <p>诊所</p>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "UnSureNav",
        props:{
            type:{
                type: String,
                default:null
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-list {
        text-align: center;
        padding-top: .22rem;
        li {
            list-style: none;
            width: 33%;
            display: inline-block;
            svg {
                width: 1.1rem;
                height: 1.1rem;
                border-radius: 100%;
            }
            p {
                font-size: .28rem;
                color: #333;
                margin-top: .15rem;
                margin-bottom: .3rem;
            }
        }
    }
</style>
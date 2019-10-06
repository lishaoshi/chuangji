import { mapState , mapActions} from 'vuex';
import PayFor from '@/components/PayFor';
import PopupDialog from '@/components/PopupDialog';
import ActionSheet from '@/components/ActionSheet';
import PhontoSwipe from '@/components/PhotoSwipe';

export default {
    name: 'App',
    render () {
        return (
            <div id="app" class="wap-wrap">
                <keep-alive>{this.keepAlive && <router-view />}</keep-alive>
                {!this.keepAlive && <router-view />}
                <div>
                    <PhontoSwipe />
                    <PayFor />
                    <ActionSheet />
                    <PopupDialog />
                </div>
            </div>
        );
    },
    data:() => ({
        title:'创联云工厂',
    }),
    computed: {
        keepAlive () {
            return this.$route.meta.keepAlive || false
        },
        ...mapState({
            UID: state => state.CURRENTUSER.data.id,

            status: state => state.EASEMOB.status,
        })
    },
    watch: {
        $route (newRoute){
            let { title } = newRoute.meta || {}

            if(title){
                this.title = title
            }
        },

        title (newTitle){
            if(newTitle){
                document.title = newTitle
            }
        }
    },
    methods: mapActions({
        bootstrapHandle: "BOOTSTRAPPERS"
    }),
    created (){
       
        this.bootstrapHandle();
    },
}
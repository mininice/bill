import BillList from '@components/bill/list.vue'
import BillAdd from '@components/bill/add.vue'


const routes = [
  	{
    	path: '/bill/list',
    	component: BillList,
  	},
  	{
    	path: '/bill/add',
    	component: BillAdd,
  	}
]

export default routes

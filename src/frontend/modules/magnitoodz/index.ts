import { saga as magnitoodzSaga } from './saga'
import { magnitood as magnitoodReducer } from './reducers/magnitood'
import { magnitoodz as magnitoodzReducer } from './reducers/magnitoodz'
import { MagnitoodzList as MagnitoodzListComponent } from './components/magnitoodz-list'
import { MagnitoodWithRouter } from './components/magnitood'

export const saga = magnitoodzSaga
export const magnitoodz = magnitoodzReducer
export const magnitood = magnitoodReducer
export const MagnitoodzList = MagnitoodzListComponent
export const Magnitood = MagnitoodWithRouter
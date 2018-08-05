import { saga as magnitoodzSaga } from './saga'
import { magnitood as magnitoodReducer } from './reducers/magnitood'
import { magnitoodz as magnitoodzReducer } from './reducers/magnitoodz'
import { MagnitoodzList as MagnitoodzListComponent } from './components/magnitoodz-list'
import { ComposedMagnitood } from './components/magnitood'
import { ComposedEditor } from './components/editor'

export const saga = magnitoodzSaga
export const magnitoodz = magnitoodzReducer
export const magnitood = magnitoodReducer
export const MagnitoodzList = MagnitoodzListComponent
export const Magnitood = ComposedMagnitood
export const Editor = ComposedEditor

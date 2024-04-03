
import { GlobalSizes } from '../settings';

export const isMobile = () => {
   return window.innerWidth < GlobalSizes.mobileMax;
}
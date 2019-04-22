import {
  CHECK_AVAILABLE_DATES_START,
  CHECK_AVAILABLE_DATES_SUCCESS,
  CHECK_AVAILABLE_DATES_ERROR,
  GET_LISTING_SPECIFIC_FIELDS_DATA_SUCCESS,
  IMAGE_LIGHTBOX_OPEN,
  IMAGE_LIGHTBOX_CLOSE,
  CONTACT_HOST_OPEN,
  CONTACT_HOST_CLOSE,
 } from '../constants';

export default function viewListing(state = {}, action) {
  switch (action.type) {

    case CHECK_AVAILABLE_DATES_START:
      return {
        ...state,
        isLoading: action.isLoading,
        maximumStay: action.payload.maximumStay
      };

    case CHECK_AVAILABLE_DATES_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        availability: action.availability,
        maximumStay: action.payload.maximumStay
      };

    case CHECK_AVAILABLE_DATES_ERROR:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case GET_LISTING_SPECIFIC_FIELDS_DATA_SUCCESS:
      return {
        ...state,
        settingsData: action.settingsData
      };

    case IMAGE_LIGHTBOX_OPEN:
      return {
        ...state,
        imageLightBox: action.imageLightBox
      };

    case IMAGE_LIGHTBOX_CLOSE:
      return {
        ...state,
        imageLightBox: action.imageLightBox
      };

    case CONTACT_HOST_OPEN:
      return {
        ...state,
        showContactHostModal: action.payload.showContactHostModal
      };

    case CONTACT_HOST_CLOSE:
      return {
        ...state,
        showContactHostModal: action.payload.showContactHostModal
      };

    default:
      return state;
  }
}

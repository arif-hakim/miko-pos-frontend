import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Vue from 'vue'

const notificationOptions = (variant, title, icon, message) => {
    Vue.$toast({
      component: ToastificationContent,
      position: 'top-center',
      props: {
        title,
        icon,
        variant,
        text: message,
      },
    })
  } 
  
  const notification = {
    success: message => notificationOptions('success', 'Success!', 'CheckIcon', message),
    warning: message => notificationOptions('success', 'Warning!', 'AlertTriangleIcon', message),
    info: message => notificationOptions('info', 'Informmation!', 'InfoIcon', message),
    error: message => notificationOptions('danger', 'Oops!', 'XIcon', message),
  }
  
  export default notification

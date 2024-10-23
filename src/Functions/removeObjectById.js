// تابع برای حذف آبجکت با آی دی مشخص از آرایه
export function removeObjectById(arr, id , name) {
  return arr.filter(i => i[name] !== id)
}



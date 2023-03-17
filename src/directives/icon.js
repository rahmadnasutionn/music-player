export default {
    beforeMount(element, binding) {
        const iconClass = `fa fa-${binding.value} float-right text-green-400 text-xl`

        element.innerHTML += `<i title="play" class="${iconClass}"></i>`
    }
}
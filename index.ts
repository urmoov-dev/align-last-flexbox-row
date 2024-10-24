const howManyFlexRows = (children:any):number => {
    if(!children) return -1

    const items :any[] = Array.from(children)
    let baseOffset = items[0].offsetTop
    let numberOfRows = 1

    items.forEach(item => {
        if (item.offsetTop > baseOffset && !item.classList.contains("flex-row-filler")) {
            baseOffset = item.offsetTop
            numberOfRows++
        }
    })
    return numberOfRows
}

const howManyFlexColumns = (children:any):number => {
    if(!children) return -1

    const items :any[] = Array.from(children)
    let baseOffset = items[0].offsetLeft
    let numberOfColumns = 1

    items.forEach(item => {
        if (item.offsetLeft > baseOffset && !item.classList.contains("flex-row-filler")) {
            baseOffset = item.offsetLeft
            numberOfColumns++
        }
    })
    return numberOfColumns
}

export function alignLastFlexLine(element:HTMLElement) {
    let rowFiller
    const alreadyHasFiller = (element.lastElementChild as HTMLElement).classList.contains("flex-row-filler") ? 1 : 0
    if (!alreadyHasFiller) {
        rowFiller = element.appendChild(document.createElement("div"))
        rowFiller.classList.add("flex-row-filler")
        rowFiller.style.height = "0px"
    } else {
        rowFiller = element.lastElementChild as HTMLElement
    }
    rowFiller.style.width = "0px"

    const numberOfChildren = Array.from(element.children).length - alreadyHasFiller
    const flexRows = howManyFlexRows(element.children)
    const flexColumns = howManyFlexColumns(element.children)
    const flexCells = flexRows*flexColumns
    const remainder = flexCells - numberOfChildren 
    if (remainder === 0 || flexRows <= 1) return
    
    const columnWidth = (element.children[0] as HTMLElement).offsetWidth || 0
    const firstColumnStart = (element.children[0] as HTMLElement).offsetLeft
    const secondColumnStart = (element.children[1] as HTMLElement).offsetLeft
    const gap = Number(element.style.gap) || secondColumnStart-firstColumnStart-columnWidth
    const finalWidth = remainder*columnWidth+(remainder-1)*gap
    rowFiller.style.width = `${finalWidth}px`
}

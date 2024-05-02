export default function formValidation(event) {
    var { name, value } = event.target
    switch (name) {
        case "name":
        case "color":
        case "Profile":
            if (value.length === 0)
                return name + " must required"
            else if (value.length < 3)
                return name + " must contains atleast 3 Character"
            else if (value.length > 50)
                return name + " must contains less then 50 Character"
            else
                return ""

        case "size":
            if (value.length === 0)
                return name + " must required"
            else if (value.length > 10)
                return name + " must contains less then 10 Character"
            else
                return ""
        case "baseprice":
            if (!value)
                return name + " must required"
            else if (value < 1)
                return name + " price must be greater then 0"
            else
                return ""
        case "discount":
            if (value < 0 && value > 100)
                return name + " discount must be greater then or equal 0 && less then 100"
            else
                return ""

        case "message":
            if (value.length === 0)
                return name + " must required"
            else if (value.length < 100)
                return name + " must contains atleast 100 Character"
            else
                return ""
    }
}

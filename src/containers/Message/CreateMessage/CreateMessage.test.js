const CreateMessage = require("./CreateMessage")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new CreateMessage.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

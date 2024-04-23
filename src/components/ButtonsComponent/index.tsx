import { Component, createEffect, createRenderEffect, createSignal, JSX, JSXElement, onCleanup } from "solid-js";
import styles from "./styles.module.css";

function clickOutside(el: any, accessor: any) {
    const onClick = (e: any) => !el.contains(e.target) && accessor()?.();
    document.body.addEventListener("click", onClick);

    onCleanup(() => document.body.removeEventListener("click", onClick));
}

interface ButtonsProps {
    showDelete: boolean;
    onClickAdd: (numberInputs: number, numberOutputs: number) => void;
    onClickAddInput: (name: string, placeholder: string) => void;
    onClickDelete: () => void;
    onCode: string;
}

const ButtonsComponent: Component<ButtonsProps> = (props: ButtonsProps) => {
    // Signals
    const [numberInputs, setNumberInputs] = createSignal<number>(0);
    const [numberOutputs, setNumberOutputs] = createSignal<number>(0);
    const [selected, setSelected] = createSignal<number>(0);
    const [content, setContent] = createSignal<JSX.Element>(<></>);

    //Default values
    const [isOpen, setIsOpen] = createSignal<boolean>(false);
    const [isOpenCode, setIsOpenCode] = createSignal<boolean>(false);

    //Input values
    const [inputName, setInputName] = createSignal<string>("");
    const [inputPlaceholder, setInputPlaceholder] = createSignal<string>("");
    const [code, setCode] = createSignal<string>("");

    // Effects
    createRenderEffect(() => {
        if (selected() == 1) {
            setContent(
                <>
                    <label class={styles.label}>Number of inputs</label>
                    <input class={styles.input} type="number" value={numberInputs()} onInput={handleChangeNumberInputs}></input>
                    <label class={styles.label}>Number of outputs</label>
                    <input class={styles.input} type="number" value={numberOutputs()} onInput={handleChangeNumberOutputs}></input>
                    <button class={styles.buttonRect} onClick={handleOnClickAddNode}>
                        Add Node
                    </button>
                </>
            );
        } else if (selected() == 2) {
            setContent(
                <>
                    <label class={styles.label}>Name of input</label>
                    <input class={styles.input} type="text" value={inputName()} onInput={handleChangeInputName}></input>
                    <label class={styles.label}>Placeholder</label>
                    <input class={styles.input} type="text" value={inputPlaceholder()} oninput={handleChangeInputPlaceholder}></input>
                    <button class={styles.buttonRect} onClick={handleOnClickAddInput}>
                        Add Input
                    </button>
                </>
            );
        } else {
            setContent(<></>);
        }
    }, [selected]);

    createRenderEffect(() => {
        setCode(props.onCode);
    }, [code]);

    // Handlers
    function handleOnClickAdd(event: any) {
        event.stopPropagation();
        setIsOpen(true);
    }

    function handleOnClickCode(event: any) {
        event.stopPropagation();
        setIsOpenCode(true);
    }

    function handleOnClickAddNode(event: any) {
        event.stopPropagation();

        // Validate number of inputs and outputs
        if (numberInputs() > 4 || numberInputs() < 0 || numberOutputs() > 4 || numberOutputs() < 0) return;

        setIsOpen(false);
        props.onClickAdd(numberInputs(), numberOutputs());
        setNumberInputs(0);
        setNumberOutputs(0);
    }

    function handleOnClickAddInput(event: any) {
        event.stopPropagation();

        // Validate input name
        if (inputName() == "") return;

        setIsOpen(false);
        props.onClickAddInput(inputName(), inputPlaceholder());
        setInputName("");
        setInputPlaceholder("");
    }

    function handleChangeNumberInputs(event: any) {
        setNumberInputs(event.target.value);
    }

    function handleChangeNumberOutputs(event: any) {
        setNumberOutputs(event.target.value);
    }

    function handleChangeInputName(event: any) {
        setInputName(event.target.value);
    }

    function handleChangeSelect(event: any) {
        setSelected(event.target.value);
    }

    function handleChangeInputPlaceholder(event: any) {
        setInputPlaceholder(event.target.value);
    }

    function handleClickOutsideDropwdown() {
        setIsOpen(false);
        setNumberInputs(0);
        setNumberOutputs(0);
    }

    function handleClickOutsideCode() {
        setIsOpenCode(false);
    }

    return (
        <div class={styles.wrapper}>
            <button class={props.showDelete ? styles.buttonDelete : styles.buttonDeleteHidden} onClick={props.onClickDelete}>
                <svg
                    fill="currentColor"
                    stroke-width="0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    style="overflow: visible;"
                >
                    <path d="m170.5 51.6-19 28.4h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6h-93.7c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6 36.7 55H424c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8v304c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128h-8c-13.3 0-24-10.7-24-24s10.7-24 24-24h69.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128v304c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32V128H80zm80 64v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"></path>
                </svg>
            </button>
            <button class={styles.buttonAdd} onClick={handleOnClickAdd}>
                <svg
                    fill="currentColor"
                    stroke-width="0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    style="overflow: visible;"
                >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
                </svg>
            </button>
            <button class={styles.buttonCode} onclick={handleOnClickCode}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="1em" 
                    width="1em"
                    fill="currentColor" 
                    class="bi bi-code-slash" 
                    viewBox="0 0 16 16"> 
                        <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/> 
                </svg>
            </button>
            <div
                class={isOpen() ? styles.dropdown : styles.dropdownHidden}
                //@ts-ignore
                use:clickOutside={handleClickOutsideDropwdown}
            >
                <div>
                    <label class={styles.label}>Node Type</label>
                    <select class={styles.select} value={selected()} onChange={handleChangeSelect}>
                        <option value={0}>Select node Type</option>
                        <option value={1}>Node default</option>
                        <option value={2}>Node Input</option>
                    </select>
                </div>
                <div class={styles.content}>
                    {content()}
                </div>
            </div>
            <div
                class={isOpenCode() ? styles.dropdownCode : styles.dropdownCodeHidden}
                //@ts-ignore
                use:clickOutside={handleClickOutsideCode}
            >
                <label class={styles.label}>Code</label>
                <textarea class={styles.textarea}>{code()}</textarea>
                <button class={styles.buttonRect}>Copy</button>
            </div>
        </div>
    );
};

export default ButtonsComponent;

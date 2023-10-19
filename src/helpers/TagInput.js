import React from "react";
import { TagGroup, Tag, Input, IconButton } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

import { nanoid } from "nanoid";
import { set } from "rsuite/esm/utils/dateUtils";

/* this will get piped in as props from App.js */
const tag_data = [
  {
    id: "0",
    tag: "fitness",
    weight: 0,
    selected: false,
  },
  {
    id: "1",
    tag: "motivation",
    weight: 2,
    selected: true,
  },
];

export default function TagInput() {
  const [tags, setTags] = React.useState(tag_data);
  const [typing, setTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  /* console.log(tags) */

  function handleSelect(e) {
    /* console.log(tags) */
    return setTags((prev) => {
      const to_find = e.target.innerText.slice(1);
      /* console.log(to_find) */
      let newTags = [];

      for (let i = 0; i < prev.length; i++) {
        let oldTag = prev[i];

        if (oldTag.tag === to_find) {
          /* BELOW is the key moment of changing the actual value (t/f) of found.selected */
          /* console.log(oldTag.selected) */
          const new_sel_val = !oldTag.selected;
          /* console.log("new boolean 'selected' val: ", new_sel_val) */
          newTags.splice(i, 0, { ...oldTag, selected: new_sel_val });
        } else {
          newTags.splice(i, 0, { ...oldTag });
        }
      }
      return newTags;
    });
  }

  const addTag = () => {
    const n_id = nanoid(5);
    const nextTags = inputValue
      ? [...tags, { id: n_id, tag: inputValue, weight: 1, selected: true }]
      : tags;
    setTags(nextTags);
    setTyping(false);
    console.log(`Added "${inputValue}"`);
    setInputValue("");
  };

  const handleButtonClick = () => {
    setTyping(true);
  };

  const renderInput = () => {
    if (typing) {
      return (
        <Input
          className='tag-input'
          size='sm'
          autoFocus={true}
          style={{ width: 70 }}
          value={inputValue}
          onChange={setInputValue}
          onBlur={addTag}
          onPressEnter={addTag}
        />
      );
    }
    return (
      <IconButton
        className='tag-add-btn'
        onClick={handleButtonClick}
        icon={<PlusIcon />}
        appearance='ghost'
        size='sm'
      />
    );
  };
  return (
    <TagGroup>
      {Array.isArray(tags) ? (
        tags.map((item) => (
          <Tag
            key={item.id}
            className={item.selected ? "tag-sel" : "tag-unsel"}
            onClick={handleSelect}>
            {`#${item.tag}`}
          </Tag>
        ))
      ) : (
        <h1> `Ish is not an Array, Tags = ${tags}`</h1>
      )}
      {renderInput()}
    </TagGroup>
  );
}

import React from "react";
import { InputGroup, Button, Form } from "react-bootstrap";

function Search({ searchClear, search, setSearch, debouncedSearchItem }) {
  return (
    <div>
      <InputGroup>
        <Form.Control
          placeholder="Search . . ."
          aria-label="Search"
          aria-describedby="basic-addon2"         
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSearchItem(e.target.value);
          }}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={searchClear}>
          X
        </Button>
      </InputGroup>
    </div>
  );
}

export  {Search};

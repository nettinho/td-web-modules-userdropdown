import { getParsedEvents } from "..";

describe("selectors: getParsedEvents", () => {
  const r1 = {
    id: 1,
    service: "My invented service 1",
    resource_id: 2,
    payload: [{ field: "Ou", value: 5 }, { field: "id", value: 6 }]
  };
  const r2 = {
    id: 2,
    service: "My invented service 2",
    resource_id: 2,
    payload: [{ field: "Ou", value: 7 }, { field: "id", value: 3 }]
  };

  const events = [
    {
      id: 1,
      service: "My invented service 1",
      resource_id: 2,
      payload: { Ou: 5, id: 6 }
    },
    {
      id: 2,
      service: "My invented service 2",
      resource_id: 2,
      payload: { Ou: 7, id: 3 }
    }
  ];

  it("should return all the events with the new payload", () => {
    const res = getParsedEvents({ events });
    expect(res).toHaveLength(2);
    expect(res).toEqual(expect.arrayContaining([r1, r2]));
  });

  it("should return empty array when we have no elements", () => {
    const res = getParsedEvents({ events: [] });
    expect(res).toHaveLength(0);
    expect(res).toEqual(expect.arrayContaining([]));
  });
});

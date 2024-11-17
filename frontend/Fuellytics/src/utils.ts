interface IDropdownValue {
    label: string,
    value: string
}

interface IEntriesResponse {
    year: number,
    make: string,
    model: string,
    cylinders: number,
    displacement: number,
    recordsReturned: number,
    data: Array<{
        cityPercent: number,
        highwayPercent: number,
        mpg: number,
        state: string,
        lastDate: Date
    }>,
    fallbackStats?: {
        avgCityMpg: number,
        avgHwyMpg: number,
        avgCombMpg: number,
    }
}

export async function fetchYears(make?: string | null, model?: string | null): Promise<Array<IDropdownValue>> {
    const res = await fetch(`http://localhost:3000/dropdowns/year?make=${encodeURIComponent(make ?? "")}&model=${encodeURIComponent(model ?? "")}`);
    const result = await res.json();
    result.sort();
    const formatted = result.map((year: number) => {
        return { value: year.toString(), label: year.toString() };
    });
    return formatted;
}

export async function fetchMakes(year?: string | null): Promise<Array<IDropdownValue>> {
    const res = await fetch(`http://localhost:3000/dropdowns/make?year=${encodeURIComponent(year ?? "")}`);
    const result = await res.json();
    result.sort();
    const formatted = result.map((make: string) => {
        return { value: make, label: make };
    });
    return formatted;
}

export async function fetchModels(make: string, year?: string | null): Promise<Array<IDropdownValue>> {
    const res = await fetch(`http://localhost:3000/dropdowns/model?make=${encodeURIComponent(make)}&year=${encodeURIComponent(year ?? "")}`);
    const result = await res.json();
    result.sort();
    const formatted = result.map((model: string) => {
        return { value: model, label: model };
    });
    return formatted;
}

export async function fetchEntries(vehicleId: number): Promise<IEntriesResponse> {
    const res = await fetch(`http://localhost:3000/vehicles/entries?vehicleId=${vehicleId}`);
    const result: IEntriesResponse = await res.json();
    return result;
}
import { Select } from '@navikt/ds-react'

export default function BrevgruppeValg() {
    return (
      <Select name="brevGruppe" label="Brevgruppe" size="small">
        <option value="">Velg brevgruppe</option>
        <option value="brevgr001">brevgr001 - Pensjon standard brev</option>
        <option value="brevgr002">brevgr002 - Pensjon standard vedtak positiv brev</option>
        <option value="brevgr003">brevgr003 - Pensjon standard vedtak negativ brev</option>
        <option value="brevgr004">brevgr004 - Pensjon standard vedtak andre brev</option>
        <option value="brevgr007">brevgr007 - Pensjon vedtak fleksibelt uttak</option>
        <option value="brevgr008">brevgr008 - SED-blanketter</option>
        <option value="brevgr010">brevgr010 - Pensjon vedtak brev</option>
        <option value="brevgr011">brevgr011 - Pensjon brev</option>
      </Select>
    );
}
